<?php

namespace App\Enums;

enum TaskStatus: string
{
    case Backlog = 'backlog';
    case Canceled = 'canceled';
    case Done = 'done';
    case InProgress = 'in_progress';
    case Todo = 'todo';

    public static function isActive(TaskStatus $status): bool
    {
        return in_array($status, [self::Todo, self::InProgress, self::Done]);
    }
}
