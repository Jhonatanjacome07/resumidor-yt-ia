<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Summary extends Model
{
    use HasFactory;

    /**
     * El nombre de la tabla asociada al modelo.
     * @var string
     */
    protected $table = 'summaries';

    /**
     * Los atributos que son "mass assignable" 
 
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'request_id',
        'video_id',
        'video_title',
        'video_author',
        'thumbnail_url',
        'video_url',
        'summary',
        'analysis_data',
        'transcript_length',
        'is_public',
    ];

    /**
     * Los atributos que deben ser casteados a tipos nativos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        // Convertimos el campo JSON de la base de datos a un array de PHP
        'analysis_data' => 'array', 
        'is_public' => 'boolean',
    ];

    /**
     * Relación: Obtiene el usuario propietario del resumen.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}