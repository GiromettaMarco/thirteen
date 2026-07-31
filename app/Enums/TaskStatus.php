<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Backlog = 'backlog';
    case Canceled = 'canceled';
    case Done = 'done';
    case InProgress = 'in_progress';
    case Todo = 'todo';
}
