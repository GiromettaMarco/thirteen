<?php

namespace App\Notifications;

use App\Models\User;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

class Invitation extends Notification
{
    /**
     * The password reset token.
     *
     * @var string
     */
    public $token;

    /**
     * Create a notification instance.
     *
     * @param  string  $token
     */
    public function __construct(#[\SensitiveParameter] $token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  User  $notifiable
     */
    public function toMail($notifiable): MailMessage
    {
        return $this->buildMailMessage(
            $notifiable->profile->name,
            $this->resetPasswordUrl($notifiable),
            $this->forgotPasswordUrl()
        );
    }

    /**
     * Get the notification mail message for the given URL.
     *
     * @param  string  $name  User full name
     * @param  string  $url  Reset password url
     * @param  string  $url_alt  Forgot password url
     * @return MailMessage
     */
    protected function buildMailMessage($name, $url, $url_alt)
    {
        return (new MailMessage)
            ->subject(Lang::get('mails.invitation.subject', ['app_name' => Config::get('app.name')]))
            ->markdown('mail.invitation', ['forgotPasswordUrl' => $url_alt])
            ->greeting(Lang::get('mails.invitation.greeting', ['name' => $name]))
            ->line(Lang::get('mails.invitation.line_1'))
            ->line(Lang::get('mails.invitation.line_2'))
            ->action(Lang::get('mails.invitation.action'), $url);
    }

    /**
     * Get the reset password URL.
     *
     * @param  User  $notifiable
     * @return string
     */
    protected function resetPasswordUrl($notifiable)
    {
        return URL::route('password.reset', [
            'token' => $this->token,
            'email' => $notifiable->getEmailForPasswordReset(),
        ]);
    }

    /**
     * Get the reset forgot password URL.
     *
     * @param  User  $notifiable
     * @return string
     */
    protected function forgotPasswordUrl()
    {
        return URL::route('password.request');
    }
}
