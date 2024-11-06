<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

        public $timestamps = false;
    protected $table = 'product_image';

    protected $fillable = [
        'product_id', 'thumbnail'
    ];

    public function product()
{
    return $this->belongsTo(Product::class, 'product_id');
}

}
