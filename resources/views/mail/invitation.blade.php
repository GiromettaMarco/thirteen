<x-mail::message>
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<x-mail::button :url="$actionUrl" color="primary">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Forgot Password --}}
@lang(
    'mails.invitation.link_info',
    ['count' => config('auth.passwords.'.config('auth.defaults.passwords').'.expire')]
)<br>
[{{ $forgotPasswordUrl }}]({{ $forgotPasswordUrl }})

{{-- Salutation --}}
@lang('mails.salutation'),<br>
{{ config('app.name') }}

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
@lang('mails.action_info', ['actionText' => $actionText]) 
<span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset
</x-mail::message>
