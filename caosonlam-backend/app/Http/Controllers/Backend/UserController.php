<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('status', '!=', 0)
            ->orderBy('name', 'ASC')
            ->select("id", "name", "email", "phone", "thumbnail", "gender", "address", "roles", "status")
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'users' => $users
        ]);
    }

    public function trash()
    {
        $users = User::where('status', '=', 0)
            ->orderBy('name', 'ASC')
            ->select("id", "name", "email", "phone", "thumbnail", "gender", "address", "roles", "status")
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'users' => $users
        ]);
    }

    public function show($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'user' => null
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'user' => $user
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->fullname = $request->fullname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = bcrypt($request->password);
        $user->thumbnail = $request->thumbnail;
        $user->gender = $request->gender;
        $user->address = $request->address;
        $user->roles = $request->roles; // Bạn có thể cần xử lý để lưu nhiều vai trò nếu cần
        $user->status = $request->status; // Trạng thái được truyền từ yêu cầu
        $user->created_by = Auth::id() ?? 1; // Thay đổi thành id của người dùng hiện tại
        $user->created_at = now();

         // Xử lý lưu hình ảnh
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/userImages'), $fileName); // Lưu hình ảnh vào thư mục public/images/userImages
            $user->thumbnail = $fileName; // Lưu tên tệp hình ảnh vào trường thumbnail
        }

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'user' => $user,
                'thumbnail_url' => asset('images/userImages/' . $user->thumbnail) // Trả về URL của hình ảnh
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thêm',
            'user' => null
        ]);
    }

    public function update(UpdateUserRequest $request, string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        // Cập nhật dữ liệu
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        $user->thumbnail = $request->thumbnail;
        $user->gender = $request->gender;
        $user->address = $request->address;
        $user->roles = $request->roles; // Xử lý tương tự nếu có nhiều vai trò
        $user->status = $request->status;

        $user->updated_at = now();
        $user->updated_by = Auth::id() ?? 1;

          // Xử lý lưu hình ảnh
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');
            $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/userImages'), $fileName); // Lưu hình ảnh vào thư mục public/images/userImages
            $user->thumbnail = $fileName; // Lưu tên tệp hình ảnh vào trường thumbnail
        }

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'user' => $user,
                'thumbnail_url' => asset('images/userImages/' . $user->thumbnail) // Trả về URL của hình ảnh
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thêm',
            'user' => null
        ]);
    }

    public function status(string $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $user->status = ($user->status == 1) ? 2 : 1;
        $user->updated_at = now();
        $user->updated_by = Auth::id() ?? 1;

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật thành công',
                'user' => $user,
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể cập nhật',
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        if ($user->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa thành công',
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể xóa',
            'user' => null
        ]);
    }

    public function delete($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        $user->status = 0; // Đánh dấu là đã xóa
        $user->updated_by = Auth::id() ?? 1;
        $user->updated_at = now();

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thay đổi thành công',
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể thay đổi',
            'user' => null
        ]);
    }

    public function restore($id)
    {
        $user = User::find($id);
        if ($user == null) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'user' => null
            ]);
        }

        $user->status = 1; // Khôi phục lại
        $user->updated_by = Auth::id() ?? 1;
        $user->updated_at = now();

        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Khôi phục thành công',
                'user' => $user
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể khôi phục',
            'user' => null
        ]);
    }

}
