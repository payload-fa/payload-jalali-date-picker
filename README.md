# payload-jalali-date-picker

A simple integration of a **Jalali (Persian) date and time picker** as a custom component for **PayloadCMS**, built using **Next.js**, `react-multi-date-picker`, and `shadcn/ui`.

This project demonstrates how to extend PayloadCMS with custom fields to support Persian calendar-based date/time selection.

---

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/)
- [PayloadCMS](https://payloadcms.com/)
- [react-multi-date-picker](https://shahabyazdi.github.io/react-multi-date-picker/)
- [shadcn/ui](https://ui.shadcn.com/)
- [pnpm](https://pnpm.io/) for package management

---

## 📦 Installation

```bash
pnpm install
```

## 📦 Installation

```bash
pnpm dev
```
This will start the PayloadCMS server and Next.js app in development mode.

## 📅 Jalali Date Picker

The Jalali date and time picker is built using:

- [react-multi-date-picker](https://www.npmjs.com/package/react-multi-date-picker) – to handle Jalali calendar logic.
- [shadcn/ui] – for consistent UI and styling.

You can integrate the custom component inside your Payload collection fields like so:
```ts
{
  name: 'eventDate',
  type: 'text', // store formatted string
  admin: {
    components: {
      Field: YourJalaliDatePickerComponent,
    },
  },
}
```
Replace YourJalaliDatePickerComponent with the actual import path.

## 📁 Project Status

This is a minimal working example intended for devs who want to integrate Jalali date pickers into PayloadCMS.

## 📄 License

MIT
```vbnet
Let me know if you’d like a Persian version or want it tailored more toward publishing it on GitHub.
```
