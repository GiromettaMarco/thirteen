<?php

namespace App\Helpers;

class FlashMessage
{
    /**
     * Flash message title.
     */
    public string $title;

    /**
     * Message log level.
     *
     * Supported levels: null, "info", "success", "warning" and "error".
     */
    public ?string $level;

    /**
     * Flash message description.
     */
    public ?string $description;

    /**
     * Create a new flash message.
     */
    public function __construct(string|array $message)
    {
        if (is_array($message)) {
            // Title
            $this->title = $message['title'];

            // Description or null
            $this->description = array_key_exists('description', $message)
                ? $message['description']
                : null;

            // Level or null
            $this->level = array_key_exists('level', $message)
                ? $message['level']
                : null;

            return;
        }

        // Title
        $this->title = $message;
    }

    /**
     * Convert the object data into an associative array.
     */
    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'level' => $this->level,
        ];
    }
}
