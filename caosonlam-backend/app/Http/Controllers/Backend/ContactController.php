<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Support\Facades\Auth;

class ContactController extends Controller
{
    public function index()
    {
        $contact = Contact::where('status', '!=', 0)
            ->orderBy('created_at', 'ASC')
            ->select("id", "name", "email", "phone", "title", "content", "status")
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'contacts' => $contact
        ];
        return response()->json($result);
    }

    public function trash()
    {
        $contacts = Contact::where('status', '=', 0)
            ->orderBy('created_at', 'ASC')
            ->select("id", "name", "email", "phone", "title", "content", "status")
            ->get();
        $result = [
            'status' => true,
            'message' => 'Tải dữ liệu thành công',
            'contacts' => $contacts
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
                'contact' => null
            ];
        } else {
            $result = [
                'status' => true,
                'message' => 'Tải dữ liệu thành công',
                'contact' => $contact
            ];
        }
        return response()->json($result);
    }

    public function store(StoreContactRequest $request)
    {
        $contact = new Contact();
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->content;
        $contact->status = $request->status;
        $contact->user_id = $request->user_id;  // Gán user_id
        $contact->created_at = now();

        if ($contact->save()) {
            return response()->json([
                'status' => true,
                'message' => 'Thêm thành công',
                'contact' => $contact
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể thêm',
                'contact' => null
            ], 500);
        }
    }

    public function update(UpdateContactRequest $request, string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        // Cập nhật dữ liệu
        $contact->name = $request->name;
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->title = $request->title;
        $contact->content = $request->contents;
        $contact->status = $request->status;
        $contact->updated_by = Auth::id() ?? 1;
        $contact->updated_at = date('Y-m-d H:i:s');

        $contact->save();

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật thành công',
            'contact' => $contact,
        ]);
    }

    public function status(string $id)
    {
        $contact = Contact::find($id);
        if (!$contact) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ]);
        }

        $contact->status = ($contact->status == 1) ? 2 : 1;
        $contact->updated_at = date('Y-m-d H:i:s');
        $contact->updated_by = Auth::id() ?? 1;

        $contact->save();
        return response()->json([
            'status' => true,
            'message' => 'Cập nhật trạng thái thành công',
            'contact' => $contact,
        ]);
    }

    public function destroy($id)
    {
        $contact = Contact::find($id);

        if (!$contact) {
            return response()->json([
                'status' => false,
                'message' => 'Liên hệ không tồn tại'
            ], 404);
        }

        if ($contact->delete()) {
            return response()->json([
                'status' => true,
                'message' => 'Xóa liên hệ thành công'
            ]);
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Không thể xóa liên hệ'
            ], 500);
        }
    }
    public function delete($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'contact' => null
            ];
            return response()->json($result);
        }

        $contact->status = 0; // Đánh dấu là đã xóa (status = 0)
        $contact->updated_by = Auth::id() ?? 1; // Người thực hiện cập nhật
        $contact->updated_at = date('Y-m-d H:i:s'); // Thời gian cập nhật

        if ($contact->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'contact' => $contact
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'contact' => null
            ];
        }
        return response()->json($result);
    }

    public function restore($id)
    {
        $contact = Contact::find($id);
        if ($contact == null) {
            $result = [
                'status' => false,
                'message' => 'Không tìm thấy thông tin',
                'contact' => null
            ];
            return response()->json($result);
        }

        $contact->status = 2; // Đánh dấu trạng thái phục hồi (status = 2)
        $contact->updated_by = Auth::id() ?? 1; // Người thực hiện cập nhật
        $contact->updated_at = date('Y-m-d H:i:s'); // Thời gian cập nhật

        if ($contact->save()) {
            $result = [
                'status' => true,
                'message' => 'Thay đổi thành công',
                'contact' => $contact
            ];
        } else {
            $result = [
                'status' => false,
                'message' => 'Không thể thay đổi',
                'contact' => null
            ];
        }
        return response()->json($result);
    }
}
