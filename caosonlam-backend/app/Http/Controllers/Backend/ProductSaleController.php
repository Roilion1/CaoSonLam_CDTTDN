<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\ProductSale;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductSaleController extends Controller
{
    public function index()
    {
        $productsales = Product::where('product.status', '!=', 0)
            ->join('category','product.category_id','=','category.id')
            ->join('brand','product.brand_id','=','brand.id')
            ->rightJoin('product_sale','product.id','=','product_sale.product_id')
            ->with('images')
            ->orderBy('product_sale.created_at','DESC')
            ->select("product.id","product.name","product.status","category.name as catname","brand.name as brandname","product_sale.price_sale")
            ->get();
        $result =[
            'status' => true,
            'message' => 'Tải danh sách sản phẩm thành công',
            'productsales' => $productsales,
            'total'=>count($productsales)
        ];
        return response()->json($result);
    }

    public function trash()
    {
        $productsales = ProductSale::where('status', '=', 0)
            ->orderBy('id', 'ASC')
            ->select('id', 'product_id', 'price_sale', 'date_begin', 'date_end', 'status')
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'product_sales' => $productsales
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $productsales = ProductSale::find($id);
        if ($productsales == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'product_sale' => $productsales
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'product_sale' => $productsales
            ];
        }
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $productsales = new ProductSale();
        $productsales->product_id = $request->product_id;
        $productsales->price_sale = $request->price_sale;
        $productsales->date_begin = $request->date_begin;
        $productsales->date_end = $request->date_end;
        $productsales->status = $request->status;
        $productsales->created_by = Auth::id() ?? 1;
        $productsales->created_at = date('Y-m-d H:i:s');

        if ($productsales->save()) {
            $result = [
                'status' => true,
                'message' => 'Thêm thành công',
                'product_sale' => $productsales
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thêm',
                'product_sale' => null
            ];
        }
        return response()->json($result);
    }

    public function update(Request $request, string $id)
    {
        $productsales = ProductSale::find($id);
        if (!$productsales) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $productsales->product_id = $request->product_id;
        $productsales->price_sale = $request->price_sale;
        $productsales->date_begin = $request->date_begin;
        $productsales->date_end = $request->date_end;
        $productsales->status = $request->status;
        $productsales->updated_by = Auth::id() ?? 1;
        $productsales->updated_at = date('Y-m-d H:i:s');
        $productsales->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'product_sale' => $productsales,
        ]);
    }

    public function status(string $id)
    {
        $productsales = ProductSale::find($id);
        if (!$productsales) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $productsales->status = ($productsales->status == 1) ? 2 : 1;
        $productsales->updated_at = date('Y-m-d H:i:s');
        $productsales->updated_by = Auth::id() ?? 1;
        $productsales->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'product_sale' => $productsales,
        ]);
    }
}
