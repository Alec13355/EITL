---
title: I Left HubSpot Over One Feature and Built My Own CRM
date: "2026-11-03T12:00:00.000Z"
description: HubSpot started charging $7 a month per seat to email a file after a form submission. That's not much money, but I'd rather build the CRM with my $20 Claude subscription than justify the ROI of another one. Here's what I built, what was harder than it looks, and who should not copy me.
category: AI & Machine Learning
---

I wrote last week about [the haves and have nots](/blog/haves-versus-have-nots), and how people comfortable with AI are building tools for their exact use case instead of paying for someone else's. Turns out I was about to be my own example.

HubSpot took a feature I'd been using for free and made it a paid one. So I stopped using HubSpot.

## What Happened

The feature was about as basic as it gets: someone fills out a form, and they get emailed a file. That's how a gated download works. You give me your email, I send you the slide deck. On HubSpot's free plan, that used to just work. Now it takes a paid plan at $7 a month per seat.

I couldn't even tell you when it changed. I just went to edit the email and was informed it was now behind a paywall.

Let me be fair here: $7 a month isn't a ton of money, and HubSpot is a business that gets to charge for whatever it wants. They don't owe me free software. If you're expecting a rant about the price, this isn't it.

My problem is that a paid CRM has to earn its keep. Once I'm paying for it, even a little, I have to care whether it's worth it. Am I getting $7 a month of value out of this, per seat, and will the price stay there? Meanwhile I already have a $20 a month Claude subscription, and I can build a CRM with that. Then there's no ROI on a CRM to worry about, because there's no CRM bill.

So I looked at what I actually used, and the list was short.

## What I Actually Needed

I run courses and events through this site. Someone registers, they get an email, and they get the PDFs that go with it. Separately, I need to remember to follow up with people before too much time goes by. That's about it.

So the whole CRM is:

- **Contacts:** everyone I follow up with plus everyone who registers, in one searchable table
- **Follow-up cadence:** each person can have a "bug me every N days" setting, and `crm.py due` tells me who's up
- **Campaigns:** one per course or event, with an editable email and `{{placeholders}}`
- **PDF delivery:** each person gets their own download link that expires, and each file behind it is a fresh 1-hour SAS URL
- **Tracking:** opens, downloads, and unsubscribes, per person

No pipelines, no deal stages, no lead scoring, no dashboards. I never used them.

## One File, No Dependencies

The entire app is `crm.py`, around 1,300 lines of Python using only the standard library, with SQLite for storage. The `requirements.txt` is a single comment that exists only to tell App Service it's a Python app. Nothing to patch, no framework upgrades, and nothing that can change its pricing on me.

Hosting is the boring Azure stack:

- **Azure App Service** runs the app
- **Entra ID** handles login through App Service auth, so I wrote zero password code
- **Azure Communication Services** sends the email
- **Blob Storage** holds the PDFs in a private container

All of that fits under the Azure credits that come with my Visual Studio Enterprise subscription, so it costs me nothing out of pocket. I know that's not everyone's situation. Without credits you'd be paying for this hosting yourself, and it could easily come to more than $7 a month, so run your own numbers.

This site is static, so when someone fills out the form, the browser makes one call to the CRM:

```sh
curl -X POST https://<app>.azurewebsites.net/api/signup \
  -H 'Origin: https://eitl.ai' -H 'Content-Type: application/json' \
  -d '{"event":"1268","name":"Dana Whitfield","email":"dana@acme.com"}'
# -> {"ok": true}
```

The response is deliberately boring, and the download link only ever goes to the person's inbox. Signing up twice never sends the email twice. It sounds minor, but that's exactly the kind of bug that makes you look like a spammer.

## How It Got Built

This section is short because the build was. It went great. I told Claude to build me a CRM, then made tweaks. So far I have about 2 hours in it.

I did have a head start: I was already building a local tool on my Mac to remind me to stay in touch with folks. It scanned IMAP and sent me notifications. Then I wanted open tracking and an API for this site, and both of those need a public URL, so it moved to Azure and the IMAP scan, the notifications, and the launchd job all got deleted. I like that part. When you own the software, you can throw out the parts you stopped needing.

## The Parts That Are Harder Than They Look

A CRM looks like a table with a form on top. Most of it is. Here's what isn't, and this is what you're actually paying a vendor for.

**Unsubscribes have to outlive the contact.** A boolean on the contact row isn't enough. If someone unsubscribes, I delete them, and they later register again or come in through an import, that boolean is gone and I just emailed someone who told me to stop. So there's a separate suppression table with SQLite triggers on it. Delete the contact or change their email, and the unsubscribe survives. It also means a campaign that has sent email can't be deleted, because its unsubscribe links have to keep working.

**A public form that sends email is a weapon if you let it be.** Anyone can type anyone's address into that form, and the email comes from my domain. So the endpoint only accepts allowlisted events from allowlisted sites, limits each IP to 5 signups an hour and the whole form to 200, and has a hidden honeypot field for bots. It also never returns the personal link, because that token also runs the person's unsubscribe page.

**Email deliverability is its own job.** You have to set up the custom domain and the SPF and DKIM records, and new domains start at very low send limits, on the order of 30 a minute and 100 an hour. Sending backs off on a 429 automatically, but you need to request a quota increase before a big launch. CAN-SPAM also requires your mailing address on marketing email, and that's on you now, not your vendor.

**Open tracking is mostly a lie.** Apple Mail's privacy protection loads every pixel automatically, so those people all show as opened. Gmail and Outlook with images blocked show as not opened. The number looks precise and isn't. "Visited their download link" is a far better signal, and even that gets triggered by corporate link scanners. I'd be surprised if a bigger platform can do much better with the same pixel, but it took building this for me to really internalize how little that metric means.

**Importing contacts is how you accidentally email your dentist.** I wanted my Mac's contacts in there, but my address book is not an opt-in list. So imports go to a review queue, and nobody becomes a contact until I approve them. Approved people join no campaign and get no follow-up cadence by default. Re-running the import won't bring back anyone I denied.

**Auth has to fail closed.** The admin pages trust the identity headers App Service injects. If App Service auth ever got turned off, anyone could spoof those headers. So in that case the admin pages refuse everyone, and `ADMIN_EMAILS` is a second check on top of Entra's assignment requirement.

## What I Gave Up

I'll be straight about the tradeoffs, because this isn't free:

- **It's one instance.** SQLite on App Service's `/home` can't handle multiple writers on scale-out. I am not going to outgrow this, but a real company would.
- **I'm the support team.** If email breaks during a launch, nobody is picking up a ticket but me.
- **There's no ecosystem.** No integrations, no app marketplace, no sales team features, no one to hand it off to.
- **Compliance is on me.** The unsubscribe work above only exists because I went and thought about it. It would have been easy not to.

As for what I miss from HubSpot: nothing so far. Ask me again in a year.

## Should You Do This?

Probably not, if you have a sales team, more than a handful of people touching the data, or real money flowing through pipeline reports. HubSpot is a good product for those companies, and rebuilding it would be a terrible use of your time.

But if you're one person or a small shop using a sliver of a platform, the math changed. Software you'd never have justified writing because it would take a month now takes far less, and it does exactly what you need and nothing else.

That's what I'd think about if I were a vendor reviewing which basic features to move behind a paywall. $7 a month used to be an easy yes, because the alternatives were paying a competitor or spending weeks writing software. Now there's a third option, and for me it took about 2 hours and a [Claude Code](/blog/claude-code-beats-copilot-cli) subscription I already had. When the small price is what makes someone stop and do the math, the math might not come out your way.

Have you dropped a SaaS tool for something you built yourself? I'd love to hear how it went on [LinkedIn](https://www.linkedin.com/in/alec13355/).
