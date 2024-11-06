<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'product';

    public function images()
{
    return $this->hasMany(ProductImage::class, 'product_id');
}

    public function getThumbnailAttribute()
    {
        return $this->images->first() ? $this->images->first()->thumbnail : null; // Lấy hình ảnh đầu tiên
    }
}
