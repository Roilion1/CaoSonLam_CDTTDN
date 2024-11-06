<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::where('status','!=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","slug","image","description","status")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'brands'=>$brands
        ];
        return response()->json($result);
    }

    public function trash()
    {
        $brands = Brand::where('status','=',0)
            ->orderBy('sort_order','ASC')
            ->select("id","name","slug","image","description","status")
            ->get();
        $result =[
            'status'=>true,
            'message'=>'Tải dữ liệu thành công',
            'brands'=>$brands
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $brand = Brand::find($id);
        if($brand==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thấy dữ liệu',
                'brand'=>$brand
            ];
        }
        else
        {
            $result =[
                'status'=>true,
                'message'=>'Tải dữ liệu thành công',
                'brand'=>$brand
            ];
        }
        return response()->json($result);
    }

    public function store(StoreBrandRequest $request)
    {
        $brand = new Brand();
        $brand->name = $request->name;
        $brand->slug = $request->slug;
        $brand->description = $request->description;
        $brand->sort_order = $request->sort_order;
        $brand->status = $request->status;
        $brand->created_by = 1;
        $brand->created_at = now();

        // Xử lý hình ảnh
        if ($request->hasFile('image')) {
            $validatedImage = $request->validate([
                'image' => 'image|mimes:jpg,png,webp,gif|max:2048',
            ]);
            $imageName = time() . '.' . $validatedImage['image']->extension();
            $validatedImage['image']->move(public_path('images/brands'), $imageName);
            $brand->image = $imageName;
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Chưa chọn hình ảnh',
                'brand' => null
            ]);
        }

        if ($brand->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'brand' => $brand
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'brand' => null
            ]);
        }
    }


    public function update(UpdateBrandRequest $request, string $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $brand->name = $request->name;
        $brand->slug = $request->slug;
        $brand->description = $request->description;
        $brand->sort_order = $request->sort_order;
        $brand->status = $request->status;

        if ($request->hasFile('image')) {
            $exten = $request->image->extension();
            if (in_array($exten, array('jpg', 'jpeg', 'gif', 'png', 'webp'))) {
                $fileName = date('YmdHis') . '.' . $exten;
                $request->image->move(public_path('images/brands'), $fileName);
                $brand->image = $fileName;
            }
        }
        $brand->updated_by = Auth::id() ?? 1;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'brand' => $brand,
        ]);
    }

    public function status(string $id)
    {
        $brand = Brand::find($id);
        if (!$brand) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $brand->status = ($brand->status == 1) ? 2 : 1;
        $brand->updated_at = date('Y-m-d H:i:s');
        $brand->updated_by = Auth::id() ?? 1;
        $brand->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'brand' => $brand,
        ]);
    }

    public function destroy($id)
    {
            $brand = Brand::find($id);
            if($brand==null)
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không tìm thầy thông tin',
                    'brand'=>null
                ];
                return response()->json($result);
            }
            if($brand->delete())
            {
                $result =[
                    'status'=>true,
                    'message'=>'Xóa thành công',
                    'brand'=>$brand
                ];
            }
            else
            {
                $result =[
                    'status'=>false,
                    'message'=>'Không thể xóa',
                    'brand'=>null
                ];
            }
            return response()->json($result);
    }

    public function delete($id)
    {
        $brand = Brand::find($id);
        if($brand==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'brand'=>null
            ];
            return response()->json($result);
        }
        $brand->status = 0;
        $brand->updated_by =  1;
        $brand->updated_at =  date('Y-m-d H:i:s');
        if($brand->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'brand'=>$brand
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'brand'=>null
            ];
        }
        return response()->json($result);
    }

    public function restore($id)
    {

        $brand = Brand::find($id);
        if($brand==null)
        {
            $result =[
                'status'=>false,
                'message'=>'Không tìm thầy thông tin',
                'brand'=>null
            ];
            return response()->json($result);
        }
        $brand->status = 2;
        $brand->updated_by =  1;
        $brand->updated_at =  date('Y-m-d H:i:s');
        if($brand->save())
        {
            $result =[
                'status'=>true,
                'message'=>'Thay đổi thành công',
                'brand'=>$brand
            ];
        }
        else
        {
            $result =[
                'status'=>false,
                'message'=>'Không thể thay đổi',
                'brand'=>null
            ];
        }
        return response()->json($result);
    }
}
