<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ProductStore;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductStoreController extends Controller
{
    public function index()
    {
        $productstores = Product::where('product.status', '!=', 0)
            ->join('category','product.category_id','=','category.id')
            ->join('brand','product.brand_id','=','brand.id')
            ->rightJoin('product_store','product.id','=','product_store.product_id')
            ->with('images')
            ->orderBy('product_store.created_at','DESC')
            ->select("product.id","product.name","product.status","category.name as catname","brand.name as brandname","product_store.price_root","product_store.qty")
            ->get();
        $result =[
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'productstores' => $productstores,
            'total'=>count($productstores)
        ];
        return response()->json($result);
    }

    public function trash()
    {
        $productStores = ProductStore::where('status', '=', 0)
            ->orderBy('id', 'ASC')
            ->select('id', 'product_id', 'type', 'price', 'qty', 'status')
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'product_stores' => $productStores
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $productStore = ProductStore::find($id);
        if ($productStore == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'product_store' => null
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'product_store' => $productStore
            ];
        }
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $productStore = new ProductStore();
        $productStore->product_id = $request->product_id;
        $productStore->type = $request->type;
        $productStore->price = $request->price;
        $productStore->qty = $request->qty;
        $productStore->status = $request->status;
        $productStore->created_by = Auth::id() ?? 1;
        $productStore->created_at = now();

        if ($productStore->save()) {
            $result = [
                'status' => true,
                'message' => 'Thêm thành công',
                'product_store' => $productStore
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thêm',
                'product_store' => null
            ];
        }
        return response()->json($result);
    }

    public function update(Request $request, string $id)
    {
        $productStore = ProductStore::find($id);
        if (!$productStore) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $productStore->product_id = $request->product_id;
        $productStore->type = $request->type;
        $productStore->price = $request->price;
        $productStore->qty = $request->qty;
        $productStore->status = $request->status;
        $productStore->updated_by = Auth::id() ?? 1;
        $productStore->updated_at = now();
        $productStore->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'product_store' => $productStore,
        ]);
    }

    public function status(string $id)
    {
        $productStore = ProductStore::find($id);
        if (!$productStore) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $productStore->status = ($productStore->status == 1) ? 2 : 1;
        $productStore->updated_at = now();
        $productStore->updated_by = Auth::id() ?? 1;
        $productStore->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'product_store' => $productStore,
        ]);
    }
}
