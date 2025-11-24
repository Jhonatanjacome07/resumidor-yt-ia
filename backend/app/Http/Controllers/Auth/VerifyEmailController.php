<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request, $id, $hash)
    {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Verify the hash matches
        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return redirect(config('app.frontend_url') . '/login?verified=0&error=invalid-signature');
        }

        // Check if signature is valid
        if (! URL::hasValidSignature($request)) {
            return redirect(config('app.frontend_url') . '/login?verified=0&error=invalid-signature');
        }

        // If already verified
        if ($user->hasVerifiedEmail()) {
            return redirect(config('app.frontend_url') . '/dashboard?verified=1&already=true');
        }

        // Mark as verified
        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect(config('app.frontend_url') . '/dashboard?verified=1');
    }
}
