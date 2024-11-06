<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ProductImage;
use Illuminate\Support\Facades\File;
use App\Models\Product;

class ProductImageController extends Controller
{
    // Lấy danh sách hình ảnh sản phẩm
    public function index()
    {
        $productImages = ProductImage::with('product')->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'productImages' => $productImages->map(function ($image) {
                return [
                    'id' => $image->id,
                    'thumbnail' => $image->thumbnail,
                ];
            }),
        ];

        return response()->json($result);
    }

    // Thêm hình ảnh sản phẩm
    public function store(Request $request)
    {
        // Kiểm tra xem sản phẩm có tồn tại không
        $product = Product::find($request->product_id);

        if (!$product) {
            return response()->json([
                'status' => false,
                'message' => 'Sản phẩm không tồn tại',
            ]);
        }

        $fileName = null;

        // Kiểm tra nếu có file hình ảnh được gửi lên
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/products'), $fileName);
        }

        // Cập nhật hoặc tạo hình ảnh mới
        ProductImage::updateOrCreate(
            ['product_id' => $product->id],
            ['thumbnail' => $fileName]
        );

        return response()->json([
            'status' => true,
            'message' => 'Hình ảnh đã được thêm/cập nhật thành công',
        ]);
    }

    // Cập nhật hình ảnh sản phẩm
    public function update(Request $request, $id)
    {
        $productImage = ProductImage::findOrFail($id);
        $productImage->product_id = $request->input('product_id');

        if ($request->hasFile('thumbnail')) {
            // Xóa file cũ nếu có
            $oldFile = public_path('images/productImages/' . $productImage->thumbnail);
            if (File::exists($oldFile)) {
                File::delete($oldFile);
            }

            // Lưu file mới
            $file = $request->file('thumbnail');
            $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/productImages'), $fileName);

            $productImage->thumbnail = $fileName;
        }

        if ($productImage->save()) {
            $result = [
                'status' => true,
                'message' => 'Cập nhật thành công',
                'productImage' => $productImage
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể cập nhật',
                'productImage' => null
            ];
        }

        return response()->json($result);
    }

    // Xóa hình ảnh sản phẩm
    public function destroy($id)
    {
        $productImage = ProductImage::findOrFail($id);
        $filePath = public_path('images/productImages/' . $productImage->thumbnail);
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
        $productImage->delete();

        return response()->json(['status' => true, 'message' => 'Hình ảnh sản phẩm đã được xóa']);
    }
}
