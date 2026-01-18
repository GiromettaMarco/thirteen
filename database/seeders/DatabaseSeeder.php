<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Permissions
        $view_users = Permission::create(['name' => 'view-users']);
        $edit_users = Permission::create(['name' => 'edit-users']);

        User::factory()
            ->hasAttached($view_users)
            ->hasAttached($edit_users)
            ->withProfile('Test User')
            ->create([
                'email' => 'test@example.com',
            ]);
    }
}
