# Developer Role Input Implementation Plan

Add a developer role selection (Frontend/Backend) to the registration form to better categorize users.

## Proposed Changes

### [Component] [FormSelect](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components) [NEW]
- Create `FormSelect.tsx` and `FormSelect.module.css`.
- Ensure it follows the same "lifted label" and "glassmorphic" aesthetic as `FormInput`.

### [Component] [RegisterForm](file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/RegisterForm.tsx)
- Add `role` to the form state (`frontend` | `backend` | '').
- Add validation to ensure a role is selected.
- Integrate the new `FormSelect` component.

## Verification Plan
- Open the Auth overlay and navigate to "Sign Up".
- Verify the new "Developer Role" selection is visible and styled correctly.
- Test form submission with and without a selected role.
