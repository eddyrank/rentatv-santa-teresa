# The Costa Rica List: paid listing tracking

- **Listing:** https://thecostaricalist.com/business/1707cd65-1c98-4a86-ad8f-3d05a1d299d3
- **Cost:** ~$15/month
- **Tracking start:** 2026-10-13
- **Check-ins:** 2026-10-28 (day 15), 2026-11-12 (day 30)

## How each lead type is tracked

| Lead path on the listing | How to count it |
|---|---|
| "Website" button → rentatvsantateresa.com | GA4 → Reports → Acquisition → Traffic acquisition, filter Session source = `thecostaricalist.com` (or `thecostaricalist` once the UTM link is in place) |
| WhatsApp button | Pre-filled text says *"I found ATV Rentals Santa Teresa on The Costa Rica List."* Search WhatsApp for **"Costa Rica List"** and count chats |
| Email button (`atvrentalsantateresa@gmail.com`) | Not unique to this listing: the same address is on TripAdvisor, Bing Places, Costa Rica Unlimited and AngloInfo. Ask every email lead "how did you find us?" |
| Phone call button | Not trackable automatically. Ask callers "how did you find us?" and tally below |

**To-do:** ask The Costa Rica List to change the listing's website link to this UTM-tagged URL so visits are labelled even if the referrer is stripped:

```
https://rentatvsantateresa.com/?utm_source=thecostaricalist&utm_medium=directory&utm_campaign=paid_listing
```

## Log

| Date | Window | Site sessions from listing | WhatsApp chats ("Costa Rica List") | Calls | Bookings | Revenue | Notes |
|---|---|---|---|---|---|---|---|
| 2026-10-28 | Day 0–15 | | | | | | |
| 2026-11-12 | Day 0–30 | 0 (GA4) | 0 | 0 | ? | ? | 1 email lead to atvrentalsantateresa@gmail.com. Source unconfirmed: that address is on this listing and also on TripAdvisor, Bing Places, Costa Rica Unlimited and AngloInfo. The other lead used the site's booking form (WhatsApp, organic/direct traffic), not the listing. |

**Break-even:** one ATV booking a month covers the $15 easily. If day 30 shows zero WhatsApp chats and only a handful of site visits, cancel or renegotiate.
