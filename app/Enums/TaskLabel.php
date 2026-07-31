<?php

namespace App\Enums;

enum TaskLabel: string
{
    case Bug = 'bug';
    case Documentation = 'documentation';
    case Feature = 'feature';
}
