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
        Schema::table('users', function (Blueprint $table) {
            $table->string('lemon_squeezy_customer_id')->nullable()->after('email');
            $table->string('subscription_status')->default('free')->after('lemon_squeezy_customer_id');
            $table->integer('monthly_usage_count')->default(0)->after('subscription_status');
            $table->timestamp('last_usage_reset_date')->nullable()->after('monthly_usage_count');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['lemon_squeezy_customer_id', 'subscription_status', 'monthly_usage_count', 'last_usage_reset_date']);
        });
    }
};
