# We Automated Purchasing in Odoo So Engineering Time Stays in Engineering

If you run a hardware team, you know this pattern: the real bottleneck is often not design work, simulation, or testing. It is purchasing admin.

As a one-man hardware design agency, I kept hitting the same wall. I would finish technical work, then lose focus to part number cleanup, BOM formatting, RFQ drafting, PO creation, and supplier follow-up. None of that is where engineering value is created, but it still had to be done.

So I stopped treating purchasing as a manual side task and built it into the engineering workflow itself.

## The problem: engineering time was leaking into admin

Most hardware teams accept purchasing overhead as normal. Engineers design in CAD, then someone manually translates that into ERP records and procurement documents. In small teams, that "someone" is often the same engineer.

The cost is not only time. Manual procurement creates repeated context switching:

- technical context (design decisions, constraints)
- operational context (supplier data, lead times, terms)
- documentation context (part master data, BOM revisions, approvals)

Every switch introduces friction and mistakes. A wrong unit, duplicate part, missing revision note, or copied typo can travel all the way into purchasing.

In practice, this means engineers spend high-focus hours doing low-leverage work and still carry the risk of data quality issues.

> "If engineers are writing follow-up emails all afternoon, your process is broken."

I wanted a process where ERP accuracy improves while manual effort drops.

## What we built: CAD to ERP to procurement drafts

We built an automation layer on top of an industry-standard ERP (Odoo) and connected it to CAD-originating data.

The workflow has three core parts:

### 1) CAD -> ERP part numbers and BOMs

When design data is ready, AI-assisted logic generates or maps part numbers and creates BOM structures directly in ERP format.

This does not mean "blindly trust AI." It means:

- parse structured CAD-exported fields
- apply naming and classification rules
- check against existing ERP records to avoid duplicates
- create draft master data and BOM lines in the right hierarchy

The key is consistency. Instead of each engineer formatting data manually, the system applies the same logic every time.

### 2) RFQ and purchase order drafts

Once BOM and sourcing context are in ERP, the system prepares draft RFQs and purchase orders for review.

This includes:

- supplier matching based on existing vendor data
- line-item population from approved BOM content
- draft document generation with required fields

The output is a draft, not an auto-sent commitment. Humans still review commercial details before anything goes out.

### 3) Supplier follow-up after order placement

After a PO is placed, routine follow-up becomes a structured process instead of ad-hoc email memory.

The system can trigger follow-up messages and reminders based on status, time windows, and expected confirmations. That reduces dropped threads and keeps the purchase timeline visible.

Again, this is not about replacing supplier relationships. It is about removing repetitive tracking work so people can focus on exceptions and decisions.

## Practical outcomes: faster flow, fewer errors, better traceability

The biggest outcome is not "AI magic." It is cleaner operational flow.

### Speed

Work that used to start from a blank document now starts from structured drafts. Engineers and operations people review and approve instead of retyping.

This shortens the time from design-ready to procurement-ready and removes many small delays that usually stack up.

### Fewer errors

When part data and BOM logic are generated from consistent rules, you reduce copy/paste mistakes and format drift.

You still need review gates, but reviewers spend their time checking meaningful issues instead of hunting clerical errors.

### Traceability

Because steps happen inside ERP-linked workflows, it is easier to answer basic but critical questions:

- Where did this part definition come from?
- Which BOM revision drove this RFQ?
- What was sent, when, and to whom?
- What follow-up is still open?

That traceability matters when teams scale, when audits happen, or when you need to debug a supply issue quickly.

## What is not automated (on purpose)

I want to be clear about limits. We did not automate judgment.

These remain human responsibilities:

- final technical approval of parts and BOM changes
- supplier selection strategy when trade-offs are non-trivial
- negotiation of terms, pricing, and delivery risk
- exception handling when data is incomplete or ambiguous
- accountability for release decisions

Automation handles repetitive transformation and coordination tasks. Humans handle context, trade-offs, and responsibility.

If your process has no clear ownership, automation will not fix that. It will only expose it faster.

## Closing: keep engineers in engineering

For me, the goal was simple: engineering time should be spent on engineering.

Purchasing still matters, and ERP still matters. But the manual bridge between design and procurement does not need to consume senior technical attention.

The approach we use is straightforward:

- keep the ERP standard
- add AI where data translation and routine drafting are repetitive
- keep human control at decision points

That combination is what I mean by "industry-standard ERP, boosted with AI = 10x productivity for the engineer." Not because humans disappear, but because unnecessary administrative load does.

If you are running a hardware team and this bottleneck sounds familiar, contact us at Taival Tech. We can map your current CAD-to-procurement flow and show what is practical to automate without compromising control.