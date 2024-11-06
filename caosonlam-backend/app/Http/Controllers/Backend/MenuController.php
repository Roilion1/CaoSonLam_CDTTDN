<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::where('status', '!=', 0)
            ->orderBy('id', 'ASC')
            ->select("id", "name", "link", "type", "table_id", "status")
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'menus' => $menus
        ];

        return response()->json($result);
    }

    public function trash()
    {
        $menus = Menu::where('status', '=', 0)
            ->orderBy('id', 'ASC')
            ->select("id", "name", "link", "type", "table_id", "status")
            ->get();

        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'menus' => $menus
        ];

        return response()->json($result);
    }

    public function show($id)
    {
        $menu = Menu::find($id);

        if ($menu == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'menu' => null
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'menu' => $menu
            ];
        }

        return response()->json($result);
    }

    public function store(Request $request)
    {
        $menu = new Menu();
        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id;
        $menu->status = $request->status;
        $menu->created_by = Auth::id() ?? 1;
        $menu->created_at = now();

        if ($menu->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'menu' => null
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $menu->name = $request->name;
        $menu->link = $request->link;
        $menu->type = $request->type;
        $menu->table_id = $request->table_id;
        $menu->status = $request->status;
        $menu->updated_by = Auth::id() ?? 1;
        $menu->updated_at = now();

        if ($menu->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể cập nhật',
                'menu' => null
            ]);
        }
    }

    public function status($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $menu->status = ($menu->status == 1) ? 2 : 1;
        $menu->updated_by = Auth::id() ?? 1;
        $menu->updated_at = now();

        if ($menu->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật trạng thái thành công',
                'menu' => $menu
            ]);
        }
    }

    public function destroy($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'menu' => null
            ]);
        }

        if ($menu->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa',
                'menu' => null
            ]);
        }
    }

    public function delete($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'menu' => null
            ]);
        }

        $menu->status = 0;
        $menu->updated_by = Auth::id() ?? 1;
        $menu->updated_at = now();

        if ($menu->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Đưa vào thùng rác thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể đưa vào thùng rác',
                'menu' => null
            ]);
        }
    }

    public function restore($id)
    {
        $menu = Menu::find($id);

        if (!$menu) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'menu' => null
            ]);
        }

        $menu->status = 2;
        $menu->updated_by = Auth::id() ?? 1;
        $menu->updated_at = now();

        if ($menu->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Khôi phục thành công',
                'menu' => $menu
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể khôi phục',
                'menu' => null
            ]);
        }
    }
}

