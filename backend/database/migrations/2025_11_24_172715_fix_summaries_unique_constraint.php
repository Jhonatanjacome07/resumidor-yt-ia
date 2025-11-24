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
        Schema::table('summaries', function (Blueprint $table) {
            // Drop the existing unique constraint on video_id
            $table->dropUnique(['video_id']);
            
            // Add a composite unique constraint on user_id and video_id
            // This allows multiple users to analyze the same video, 
            // but prevents the same user from analyzing the same video twice
            $table->unique(['user_id', 'video_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('summaries', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'video_id']);
            $table->unique('video_id');
        });
    }
};
