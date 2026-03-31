# Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: Module Not Found - '@prisma/client'

**Error Message:**
```
Module not found: Can't resolve '@prisma/client'
```

**Cause**: The project dependencies haven't been installed yet.

**Solution**:
```bash
npm install
# or
pnpm install
```

Then restart the dev server:
```bash
npm run dev
```

**Note**: The app is currently running in DEMO MODE with mock data. Once you run `npm install`, you can configure a real database by following the Database Setup section.

---

### Issue 2: bcryptjs or jsonwebtoken Not Found

**Error Message**:
```
Module not found: 'bcryptjs'
Module not found: 'jsonwebtoken'
```

**Cause**: Same as above - dependencies not installed.

**Solution**: Run `npm install` as shown above.

---

### Issue 3: Theme Not Changing on Toggle

**Error**: Theme button doesn't change the theme visually.

**Check**:
1. **Browser DevTools**
   - Open F12 → Console tab
   - Check for JavaScript errors
   - Look for theme-related errors

2. **localStorage**
   - Run in console: `localStorage.getItem('theme')`
   - Should return 'light' or 'dark'

3. **Cache Issue**
   - Clear browser cache: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

4. **CSS**
   - Check that globals.css is properly loaded
   - Look for purple color definitions in DevTools

**Solution**: 
```bash
# 1. Restart dev server
npm run dev

# 2. Clear browser cache
# 3. Hard refresh page
```

---

### Issue 4: Login Not Working

**Error**: "Invalid credentials" even with correct password.

**Default Credentials:**
- Email: `root`
- Password: `root`

**Solutions**:

1. **Check if you're using the right credentials**
   ```
   Admin: root / root
   Customer: user@example.com / password123
   ```

2. **Try registering a new account**
   - Go to `/login`
   - Click "Sign Up"
   - Enter email, password, and name
   - Click Register

3. **Clear localStorage and try again**
   ```javascript
   // Open console and run:
   localStorage.clear()
   // Then reload page
   ```

4. **Check API response**
   - Open DevTools → Network tab
   - Try logging in
   - Click on the `login` request
   - Check Response tab for error details

---

### Issue 5: Cart/Checkout Not Working

**Error**: "Failed to load cart" or checkout button doesn't work.

**Solutions**:

1. **Make sure you're logged in**
   - Go to `/login`
   - Use default credentials: `root` / `root`
   - Login should redirect to dashboard

2. **Check browser console for errors**
   - Open F12 → Console
   - Look for fetch errors
   - Note any error messages

3. **Check Network requests**
   - Open DevTools → Network tab
   - Try adding item to cart
   - Check if `/api/v1/cart` request succeeds
   - Look for 401 (Unauthorized) errors

4. **Verify API routes exist**
   - Files should be at:
     - `/app/api/v1/cart/route.ts`
     - `/app/api/v1/orders/route.ts`

---

### Issue 6: Admin Dashboard Not Accessible

**Error**: Redirected away from `/admin` or getting 401 error.

**Solutions**:

1. **Login as admin first**
   - Use email: `root`
   - Password: `root`
   - After login, you should be at `/admin/dashboard`

2. **Check if you're logged in**
   ```javascript
   // Open console:
   localStorage.getItem('auth_token')
   // Should return a token (long string)
   ```

3. **Check user role**
   - In localStorage: `localStorage.getItem('auth_token')`
   - Decode the token and verify role is "ADMIN"

4. **Clear cache and login again**
   ```javascript
   localStorage.clear()
   // Then go to /login
   ```

---

### Issue 7: Quote Form Not Submitting

**Error**: Form submission fails or no confirmation.

**Solutions**:

1. **Check form validation**
   - All fields must be filled:
     - Full Name (required)
     - Email (required, must be valid)
     - Company (optional)
     - Phone (optional)
     - Product Type (required)
     - Message/Details (required)

2. **Check Network Request**
   - Open DevTools → Network tab
   - Submit form
   - Look for `/api/v1/quotes` POST request
   - Check Response for errors

3. **Check Admin Quotes Panel**
   - Login as admin
   - Go to `/admin/quotes`
   - Your submitted quote should appear there
   - (If it appears, submission worked!)

4. **Email Integration**
   - Currently, quotes are stored in memory
   - Email sending needs `RESEND_API_KEY` environment variable
   - Admin can still reply via dashboard

---

### Issue 8: Page Styling Issues

**Problem**: Purple colors not showing, layout looks broken.

**Solutions**:

1. **CSS not loading**
   - Check DevTools → Sources
   - Verify `/globals.css` is loaded
   - Look for 404 errors

2. **Tailwind not compiling**
   ```bash
   # Restart dev server to recompile Tailwind
   npm run dev
   ```

3. **Browser cache**
   - Hard refresh: Ctrl+Shift+R (Windows)
   - Clear cache: Ctrl+Shift+Delete
   - Try incognito window

4. **Check color definitions**
   ```css
   /* Should be in globals.css */
   --primary: rgb(168, 85, 247); /* Purple */
   --accent: rgb(168, 85, 247);
   ```

---

### Issue 9: Routes Not Found (404 Errors)

**Error**: "Cannot GET /shop/products" or similar.

**Solutions**:

1. **Check file structure**
   - Should exist at `/app/shop/products/page.tsx`
   - Check spelling: lowercase, no spaces
   - Check parent `layout.tsx` files exist

2. **Rebuild project**
   ```bash
   # Stop dev server (Ctrl+C)
   npm run dev
   # Wait for rebuild
   ```

3. **Check next.config.js**
   - Verify Next.js configuration is correct
   - Look for any route rewrites that might interfere

---

### Issue 10: Prisma Schema Out of Sync

**Error**: "Schema validation error" or database errors after installation.

**Solutions**:

1. **First time setup**
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   ```

2. **Update schema**
   ```bash
   # Edit prisma/schema.prisma
   npx prisma db push
   ```

3. **Reset database** (careful - deletes all data!)
   ```bash
   npx prisma db push --force-reset
   ```

---

## Debug Mode

### Enable Verbose Logging

Add to `.env.local`:
```env
DEBUG=*
NODE_ENV=development
LOG_LEVEL=debug
```

### Check API Responses

Open browser DevTools → Network tab and check:
1. Status codes (200 = success, 401 = not authenticated, 500 = server error)
2. Response body for error messages
3. Response headers for CORS issues

### Console Debugging

```javascript
// Check if logged in:
console.log(localStorage.getItem('auth_token'))

// Check theme:
console.log(localStorage.getItem('theme'))

// Check all storage:
console.table(localStorage)
```

---

## Common Error Messages & Meanings

| Error | Meaning | Solution |
|-------|---------|----------|
| "Unauthorized" | Not logged in or token expired | Login again at `/login` |
| "Invalid credentials" | Wrong email/password combination | Check credentials, try registering new account |
| "Module not found" | Dependency not installed | Run `npm install` |
| "Cannot read property of undefined" | Data not loaded yet | Check API call, wait for fetch to complete |
| "CORS error" | API request blocked | Check API route headers |
| "Failed to load resource" | 404 error | Check file paths and route names |

---

## Performance Issues

If the app is running slowly:

1. **Clear browser cache**
   ```
   Ctrl+Shift+Delete (Windows)
   Cmd+Shift+Delete (Mac)
   ```

2. **Restart dev server**
   ```bash
   npm run dev
   ```

3. **Check for memory leaks** (DevTools → Memory tab)

4. **Disable browser extensions**
   - They can interfere with loading
   - Try incognito mode

---

## Still Having Issues?

### Information to Gather

Before asking for help, gather:
1. Exact error message (screenshot or copy-paste)
2. Steps to reproduce
3. Browser version
4. Output of `npm --version`
5. Output of `node --version`
6. Console errors (F12 → Console tab)
7. Network errors (F12 → Network tab)

### Support Steps

1. Check this guide again
2. Check `/SHOP_SETUP.md` for setup instructions
3. Check `/COMPLETED_FEATURES.md` for feature status
4. Review API endpoint documentation
5. Check database schema in `prisma/schema.prisma`

---

## Quick Checklist

- [ ] Ran `npm install`
- [ ] Have `.env.local` configured
- [ ] Database is set up (`npx prisma db push`)
- [ ] Dev server is running (`npm run dev`)
- [ ] Cleared browser cache (hard refresh)
- [ ] Logged in with correct credentials
- [ ] Checked console for errors (F12)
- [ ] Checked Network tab for failed requests
- [ ] Verified localStorage has auth_token
- [ ] Verified files exist in correct locations

**If all above are checked and issues persist, please provide the error details and someone can help debug further.**
