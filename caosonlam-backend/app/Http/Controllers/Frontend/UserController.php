<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function register(StoreUserRequest $request)
    {
        // Tạo mới người dùng
        $user = new User();
        $user->name = $request->name;
        $user->fullname = $request->fullname; // Nếu có trường fullname, bạn cần đảm bảo trường này tồn tại trong form
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->password = Hash::make($request->password); // Sử dụng Hash::make để mã hóa mật khẩu
        $user->gender = $request->gender;
        $user->address = $request->address;
        $user->roles = $request->roles; // Xử lý vai trò nếu cần lưu nhiều vai trò
        $user->status = 1; // Đặt trạng thái mặc định là 1 (hoạt động)
        $user->created_by = Auth::id() ?? 1; // ID của người dùng tạo hoặc giá trị mặc định
        $user->created_at = now();

        // // Xử lý lưu ảnh đại diện nếu có
        // if ($request->hasFile('thumbnail')) {
        //     $file = $request->file('thumbnail');
        //     $fileName = date('YmdHis') . '.' . $file->getClientOriginalExtension();
        //     $file->move(public_path('images/userImages'), $fileName); // Lưu vào thư mục public/images/userImages
        //     $user->thumbnail = $fileName; // Lưu tên tệp vào trường thumbnail
        // }

        // Lưu người dùng vào cơ sở dữ liệu
        if ($user->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Đăng ký thành công',
                'user' => $user,
                // 'thumbnail_url' => asset('images/userImages/' . $user->thumbnail) // Trả về URL của hình ảnh đại diện
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Không thể đăng ký'
        ]);
    }


    public function login(Request $request)
    {
        Log::info('Login request received', $request->only('email', 'password'));

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'status' => true,
                'message' => 'Đăng nhập thành công',
                'user' => Auth::user(),
            ]);
        }

        Log::error('Login failed', $credentials); // Ghi log nếu đăng nhập thất bại

        return response()->json([
            'status' => false,
            'message' => 'Đăng nhập không thành công',
        ]);
    }


        public function getForget()
        {
            // Trả về view hoặc phản hồi JSON để yêu cầu email từ người dùng
            return response()->json([
                'status' => true,
                'message' => 'Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu.',
            ]);
        }

        public function postForget(Request $request)
        {
            // Xác thực email
            $request->validate(['email' => 'required|email|exists:users,email']);

            // Gửi email đặt lại mật khẩu
            $status = Password::sendResetLink(
                $request->only('email')
            );

            return $status == Password::RESET_LINK_SENT
                ? response()->json(['status' => true, 'message' => 'Link đặt lại mật khẩu đã được gửi đến email của bạn.'])
                : response()->json(['status' => false, 'message' => 'Không thể gửi link đặt lại mật khẩu.']);
        }
}
