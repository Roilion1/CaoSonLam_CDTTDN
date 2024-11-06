<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductStore;
use App\Models\Orderdetail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('category','product.category_id','=','category.id')
            ->join('brand','product.brand_id','=','brand.id')
            ->with('images')
            ->orderBy('product.id', 'ASC')
            ->select("product.id","product.name","product.status","category.name as catname","brand.name as brandname","product.price")
            ->get();
        $result =[
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'products' => $products
        ];
        return response()->json($result);
    }

     public function trash()
    {
        $products = Product::where('product.status', '!=', 0)
            ->join('category','product.category_id','=','category.id')
            ->join('brand','product.brand_id','=','brand.id')
            ->with('images')
            ->orderBy('product.id', 'ASC')
            ->select("product.id","product.name","product.status","category.name as catname","brand.name as brandname","product.price")
            ->get();
        $result =[
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'products' => $products
        ];
        return response()->json($result);
    }

    public function store(StoreProductRequest $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->slug = $request->slug;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->content = $request->input('content', null);
        $product->price = $request->price;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->created_by = 1;
        $product->created_at = now();

        if ($product->save()) {
            // Lưu hình ảnh vào bảng product_images
            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/productImages'), $fileName);

                ProductImage::create([
                    'product_id' => $product->id,
                    'thumbnail' => $fileName,
                ]);
            }

            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'product' => null
            ]);
        }
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product || $product->status == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'product' => $product
        ]);
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::find($id);
        if (!$product || $product->status == 0) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại hoặc đã bị vô hiệu hóa'
            ], 404);
        }

        // Cập nhật các trường dữ liệu
        $product->name = $request->name ;
        $product->slug = $request->slug ;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->content = $request->input('content', $product->content);
        $product->price = $request->price;
        $product->description = $request->description;
        $product->status = $request->status;
        $product->updated_at = now();

        // Kiểm tra và lưu hình ảnh mới
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $exten = $file->getClientOriginalExtension();
            if (in_array($exten, ['jpg', 'jpeg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $exten;
                $file->move(public_path('images/productImages'), $fileName);
                $product->thumbnail = $fileName;
            }
        }

        $product->created_by = Auth::id() ?? 1; // Cập nhật người tạo (nếu cần)

        // Lưu thay đổi
        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật sản phẩm thành công',
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể cập nhật sản phẩm',
                'product' => null
            ]);
        }
    }
    public function status(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy sản phẩm',
            ]);
        }

        // Chuyển đổi trạng thái sản phẩm
        $product->status = ($product->status == 1) ? 2 : 1;
        $product->updated_at = now(); // Cập nhật thời gian sửa đổi
        $product->updated_by = Auth::id() ?? 1; // Cập nhật người sửa đổi

        $product->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật trạng thái thành công',
            'product' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin sản phẩm',
                'product' => null
            ]);
        }

        if ($product->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa sản phẩm thành công',
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa sản phẩm',
                'product' => null
            ]);
        }
    }

    public function delete($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin sản phẩm',
                'product' => null
            ]);
        }

        // Đánh dấu sản phẩm là đã xóa
        $product->status = 0;
        $product->updated_by = Auth::id() ?? 1; // Cập nhật người sửa đổi
        $product->updated_at = now(); // Cập nhật thời gian sửa đổi

        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi trạng thái sản phẩm thành công',
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thay đổi trạng thái sản phẩm',
                'product' => null
            ]);
        }
    }

    public function restore($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin sản phẩm',
                'product' => null
            ]);
        }

        // Khôi phục trạng thái sản phẩm
        $product->status = 1; // Giả sử trạng thái 1 là trạng thái hoạt động
        $product->updated_by = Auth::id() ?? 1; // Cập nhật người sửa đổi
        $product->updated_at = now(); // Cập nhật thời gian sửa đổi

        if ($product->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Khôi phục sản phẩm thành công',
                'product' => $product
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể khôi phục sản phẩm',
                'product' => null
            ]);
        }
    }

}
