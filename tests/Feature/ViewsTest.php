<?php

use App\Models\User;
use App\Models\View;

use function Pest\Laravel\actingAs;

it('may create and update a table view', function () {
    $user = User::first();

    actingAs($user)
        ->post(
            route('views.store'),
            [
                'filters' => '[]',
                'pagination' => '{"pageIndex":0,"pageSize":10}',
                'sorting' => '[{"id":"name","desc":false}]',
                'visibility' => '{}',
                'page' => 'testing',
                'table' => 'testing',
            ]
        )
        ->assertSessionHasNoErrors();

    $view = View::where('page', 'testing')
        ->where('table', 'testing')
        ->first();

    expect($view)->not->toBeNull();
    expect($view->user->id)->toBe($user->id);

    actingAs($user)
        ->post(
            route('views.store'),
            [
                'filters' => '[]',
                'pagination' => '{"pageIndex":0,"pageSize":20}',
                'sorting' => '[{"id":"name","desc":false}]',
                'visibility' => '{}',
                'page' => 'testing',
                'table' => 'testing',
            ]
        )
        ->assertSessionHasNoErrors();

    $view->refresh();

    expect($view?->pagination)->toBe('{"pageIndex":0,"pageSize":20}');
});
