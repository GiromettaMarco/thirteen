<?php

namespace App\Enums;

enum ProfileRole: string
{
    case Developer = 'developer';
    case Designer = 'designer';
    case Guest = 'guest';
    case Manager = 'manager';

    /** @return array<string> */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
