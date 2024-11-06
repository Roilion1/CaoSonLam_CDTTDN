<?php

namespace App\Http\Controllers\Frontend;

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
use App\Http\Requests\UpdateBannerRequest;

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

    public function product_category($categoryId, $limit)
    {
        $products = Product::where('product.status', '!=', 0)
            ->where('category_id', $categoryId)
            ->with('images')
            ->orderBy('product.created_at', 'DESC')
            ->limit($limit)
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ];
        return response()->json($result);
    }

    public function product_new($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->joinSub ($subproductstore, 'product_store', function ($join) {
                $join->on ('product.id', '=', 'product_store.product_id');
            })
            ->leftJoin('product_sale', function ($join) {
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('product.id', '=', 'product_sale.product_id')
                    ->where([
                        ['product_sale.date_begin', '<=', $today],
                        ['product_sale.date_end', '>=', $today],
                        ['product_sale.status', '=', 1]
                    ]);
            })
            ->with('images')
            ->orderBy('product.created_at', 'DESC')
            ->select("product.id", "product.name", "product.price", "product.slug", "product_sale.price_sale")
            ->limit($limit)
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ];
        return response()->json($result);
    }

    public function product_sale ($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->joinSub($subproductstore, 'product_store', function ($join) {
                $join->on('product.id', '=', 'product_store.product_id');
            })
            ->join('product_sale', function ($join) {
            $today = Carbon::now()->format('Y-m-d H:i:s');
            $join->on ('product.id', '=', 'product_sale.product_id')
                ->where([
                    ['product_sale.date_begin', '<=', $today],
                    ['product_sale.date_end', '>=', $today],
                    ['product_sale.status',1]
                ]);
            })
            ->with('images')
            ->orderBy('product_sale.price_sale', 'DESC')
            ->select("product.id", "product.name", "product.price", "product.slug", "product_sale.price_sale")
            ->limit($limit)
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ];
        return response()->json ($result);
    }

    public function product_bestseller ($limit)
    {
        $subproductstore = ProductStore::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');
        $suborderdetail = Orderdetail::select('product_id', DB::raw('SUM(qty) as qty'))
            ->groupBy('product_id');
        $products = Product::where('product.status', '=', 1)
            ->joinSub ($subproductstore, 'product_store', function ($join) {
                $join->on('product.id', '=', 'product_store.product_id');
            })
            ->joinSub ($suborderdetail, 'orderdetail', function ($join) {
                $join->on('product.id', '=', 'orderdetail.product_id');
            })
            ->leftJoin('product_sale', function ($join) {
                $today = Carbon::now()->format('Y-m-d H:i:s');
                $join->on('product.id', '=', 'product_sale.product_id')
                    ->where([
                        ['product_sale.date_begin', '<=', $today],
                        ['product_sale.date_end', '>=', $today],
                        ['product_sale.status', '=', 1]
                    ]);
            })
            ->with('images')
            ->orderBy( 'orderdetail.qty', 'DESC')
            ->select("product.id", "product.name", "product.price", "product.slug", "product_sale.price_sale", "orderdetail.qty")
            ->limit($limit)
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'products' => $products,
        ];
        return response()->json($result);
    }

}
