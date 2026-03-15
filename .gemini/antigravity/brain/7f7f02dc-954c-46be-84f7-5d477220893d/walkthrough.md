## New Features: Developer Role Selection

I have added a new "Developer Role" selection field to the registration form. This allows users to identify themselves as Frontend, Backend, or Fullstack developers during sign-up.

### Additions:
1.  **FormSelect Component**: A new reusable component for dropdown selections that matches our premium glassmorphic theme.
2.  **Role Validation**: The registration form now requires users to select a role before submitting.
3.  **Updated Types**: Updated the `RegisterData` interface to include the `role` field.

````carousel
```tsx
// FormSelect implementation with lifted label
<select
    id={id}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={styles.select}
>
    <option value="" disabled hidden></option>
    {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
            {opt.label}
        </option>
    ))}
</select>
```
<!-- slide -->
```tsx
// RegisterForm validation
if (!role) errs.role = 'Please select your developer role';
```
````

> [!TIP]
> The role selection uses the same "lifted label" animation as the existing text inputs, ensuring a consistent user experience.

render_diffs(file:///Users/santiagovalencia/Documents/proyecto%20inf_1/src/components/auth/components/RegisterForm.tsx)
