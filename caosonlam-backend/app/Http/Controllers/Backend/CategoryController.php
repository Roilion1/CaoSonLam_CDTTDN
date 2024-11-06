<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function index()
    {
        $categorys = Category::where('status','!=',0)
            ->orderBy('sort_order','ASC')
            ->select("id", "name", "image", "status", "parent_id")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'categorys'=>$categorys
        ];
        return response()->json($result);
    }

    public function trash()
    {
        try {
            $categorys = Category::where('status', '=', 0)
                ->orderBy('sort_order', 'ASC')
                ->select("id", "name", "image", "status", "parent_id")
                ->get();

            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'categorys' => $categorys
            ];
        } catch (\Exception $e) {
            $result = [
                'status' => false,
                'message' => 'Có lỗi xảy ra: ' . $e->getMessage(),
            ];
        }

        return response()->json($result);
    }

    public function show($id)
    {
        $category = Category::find($id);

        if ($category == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'category'=>$category
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'category' => $category
            ];
        }

        return response()->json($result);
    }

    public function store(StoreCategoryRequest $request)
    {
        $category = new Category();
        $category->name =  $request->name;
        $category->parent_id =  $request->parent_id;
        $category->slug =  $request->slug;
        $category->status =  $request->status;
        $category->description =  $request->description;
        $category->sort_order =  $request->sort_order;
        $category->created_by = 1;
        $category->created_at = now();

        // Xử lý hình ảnh
        if ($request->hasFile('image')) {
            $validatedImage = $request->validate([
                'image' => 'image|mimes:jpg,png,webp,gif|max:2048',
            ]);
            $imageName = time() . '.' . $validatedImage['image']->extension();
            $validatedImage['image']->move(public_path('images/categorys'), $imageName);
            $category->image = $imageName;
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Chưa chọn hình ảnh',
                'category' => null
            ]);
        }

        if ($category->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'category' => $category
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'category' => null
            ]);
        }
    }

    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        // Cập nhật dữ liệu
        $category->name = $request->name;
        $category->parent_id = $request->parent_id;
        $category->slug = $request->slug;
        $category->status = $request->status;
        $category->description = $request->description;
        $category->sort_order = $request->sort_order;

        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->file('image')->move(public_path('images/categorys'), $fileName);
                $category->image = $fileName;
            }
        }

        $category->created_at = date('Ymd H:i:s');
        $category->created_by = Auth::id() ?? 1;
        $category->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'category' => $category,
        ]);
    }

    public function status(string $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }
        $category->status = ($category->status == 1) ? 2 : 1;
        $category->updated_at = date('Y-m-d H:i:s');
        $category->updated_by = Auth::id() ?? 1;

        $category->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'category' => $category,
        ]);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
            if($category==null)
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không tìm thầy thông tin',
                    'category'=>null
                ];
                return response()->json($result);
            }
            if($category->delete())
            {
                $result =[
                    'status'=>true,
                    'message'=>'Xóa thành công',
                    'category'=>$category
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể xóa',
                    'category'=>null
                ];
            }
            return response()->json($result);
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'category'=>null
            ];
            return response()->json($result);
        }
        $category->status = 0;
        $category->updated_by =  1;
        $category->updated_at =  date('Y-m-d H:i:s');
        if($category->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'category'=>$category
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'category'=>null
            ];
        }
        return response()->json($result);
    }
    public function restore($id)
    {

        $category = Category::find($id);
        if($category==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'category'=>null
            ];
            return response()->json($result);
        }
        $category->status = 2;
        $category->updated_by =  1;
        $category->updated_at =  date('Y-m-d H:i:s');
        if($category->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'category'=>$category
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'category'=>null
            ];
        }
        return response()->json($result);
    }
}
