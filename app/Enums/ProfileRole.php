<?php

namespace App\Enums;

enum ProfileRole: string
{
    case Developer = 'developer';
    case Designer = 'designer';
    case Guest = 'guest';
    case Manager = 'manager';
}
