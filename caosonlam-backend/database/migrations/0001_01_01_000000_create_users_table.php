<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cdtt_user', function (Blueprint $table) {
            $table->id(); // Cột ID tự động tăng
            $table->string('name'); // Cột tên người dùng
            $table->string('email')->unique(); // Cột email, phải là duy nhất
            $table->timestamp('email_verified_at')->nullable(); // Cột xác thực email
            $table->string('password'); // Cột mật khẩu
            $table->rememberToken(); // Cột token để ghi nhớ đăng nhập
            $table->string('phone')->nullable(); // Cột số điện thoại (nếu cần)
            $table->string('thumbnail')->nullable(); // Cột hình đại diện (nếu cần)
            $table->enum('gender', ['male', 'female', 'other'])->nullable(); // Cột giới tính (nếu cần)
            $table->string('address')->nullable(); // Cột địa chỉ (nếu cần)
            $table->json('roles')->nullable(); // Cột phân quyền (nếu cần)
            $table->integer('status')->default(1); // Cột trạng thái, mặc định là 1
            $table->timestamps(); // Tạo các cột created_at và updated_at
        });

        // Nếu bạn cần bảng để lưu mã token reset mật khẩu
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); // Cột email làm khóa chính
            $table->string('token'); // Cột token
            $table->timestamp('created_at')->nullable(); // Cột thời gian tạo
        });

        // Nếu bạn cần bảng để lưu phiên đăng nhập
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // Cột ID phiên
            $table->foreignId('user_id')->nullable()->index(); // Khóa ngoại đến người dùng
            $table->string('ip_address', 45)->nullable(); // Cột địa chỉ IP
            $table->text('user_agent')->nullable(); // Cột user agent
            $table->longText('payload'); // Cột payload
            $table->integer('last_activity')->index(); // Thời gian hoạt động cuối
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions'); // Xóa bảng sessions trước
        Schema::dropIfExists('password_reset_tokens'); // Xóa bảng password_reset_tokens trước
        Schema::dropIfExists('cdtt_user'); // Xóa bảng cdtt_user sau cùng
    }
};
