---
title: Reputation Score Azure
date: "2025-08-02T22:10:03.284Z"
description: I recently ran into a problem where I needed to create consumption resources for a customer. However, due to a low reputation score, I was unable to do so.
category: Azure
---
## The Problem
I want to create an azure consumption serverfarm resource to host an Azure Function App.

I was working with a customer for my day job, shout out to [Lean Techniques](https://www.leantechniques.com/), and we were helping a client setup a new Azure subscription, and build their first foot print in Azure. Not a huge deal right? You create a subscription, you create resource group, and a resource then you're done. Right? Wrong. I was trying to create a consumption resource, and I was getting the following error:

``` bash
Validation failed for a resource. Check 'Error.Details[0]' for more information. 
```
After some digging I found a slightly more helpful error message:

``` bash
The subscription '<my-subscription-id>' is not allowed to create or update the serverfarm.
```
Weird, I think it's time to start digging into what's going on?


## Azure Policy
So first thing that we did was see if there was a restriction on creating ANY serverfarms. We did this by deploying a free tier, next we tried a B1 resource when both of those worked fine we knew we could do SOME serverfarms. 

Our next debugging step was to make sure there wasn't any weird resources that weren't registered yet since this was a new subscription. We did this by checking the resource provider status.All seemed good there and the ones that consumption functions needed were good to go. The resource provider errors are also usually very specific which wasn't the case here. For example something like please register microsoft.web to deploy this resource or something like that. This still smelt like a policy since it was so specific and was only hitting specific skus.

We then looked at Azure Policies to see if we had any parent policies on the directory restricting any types of resources we could create. We found nothing. Like I said since this client was just stepping into Azure, we didn't have any policies on the directory. We then looked at quotas and didn't see anything there. Just for sanity we tried different regions and that didn't work for consumption skus either. We were at a loss. We did find an old Microsoft Support post of someone asking about this same issue and support said to open a ticket.

## The Solution
We opened up a ticket with Microsoft Support and they were able to help us out. They said that new subscriptions and resources can get reputation scores quickly that they flag and don't allow certain type of actions. They reset our reputation score and that would allow us to create consumption resources. This was a bit of a pain, but it was the only way to get it to work. I thought I'd document our pains with this post since I didn't know a reputation score was a thing.

## The Takeaway
If you're running into this issue, you can try the following:

1. Check if there are any Azure Policies restricting the creation of consumption resources.
2. Check if there are any quotas restricting the creation of consumption resources.
3. Check if there are any resource provider errors restricting the creation of consumption resources.
4. Open a ticket with Microsoft Support and they will be able to help you out.