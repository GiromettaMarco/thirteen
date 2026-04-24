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
        Schema::create('views', function (Blueprint $table) {
            $table->id();
            $table->text('filters')->default('[]');
            $table->text('pagination')->default('{"pageIndex":0,"pageSize":10}');
            $table->text('sorting')->default('[]');
            $table->text('visibility')->default('{}');
            $table->string('page');
            $table->string('table');
            $table->foreignId('user_id')
                ->index()
                ->constrained('users')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('views');
    }
};
