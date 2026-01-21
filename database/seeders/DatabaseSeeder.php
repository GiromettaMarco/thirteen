<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $view_users = Permission::create(['name' => 'view-users']);
        $edit_users = Permission::create(['name' => 'edit-users']);

        $teams = Team::factory(2)
            ->create();

        User::factory()
            ->for($teams[0], 'currentTeam')
            ->hasAttached($view_users)
            ->hasAttached($edit_users)
            ->hasAttached($teams[0], [
                'admin' => true,
                'can_edit' => true,
                'can_delete' => true,
            ])
            ->hasAttached($teams[1], [
                'admin' => false,
                'can_edit' => false,
                'can_delete' => false,
            ])
            ->withProfile('Test User')
            ->create(['email' => 'test@example.com']);

        User::factory()
            ->withProfile('Alfred M. Harrison')
            ->create(['email' => 'alfredmharrison@example.com']);

        User::factory()
            ->for($teams[0], 'currentTeam')
            ->hasAttached($teams[0], [
                'admin' => false,
                'can_edit' => false,
                'can_delete' => false,
            ])
            ->hasAttached($teams[1], [
                'admin' => true,
                'can_edit' => true,
                'can_delete' => true,
            ])
            ->withProfile('Bob Brown')
            ->create(['email' => 'bob@example.com']);
    }
}
