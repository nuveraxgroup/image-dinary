# Image Dinary

**Author**: NuveraX (**[https://nuverax.com](https://nuverax.com)**)

**Description**: Get on-demand resize, scale and change quality of images in your Storage bucket.



**Details**: -
<!-- 
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

Use this extension to get on-demand image edit

When triggered by an HTTP request, this extension responds with an image with specific edition parameters like Resize, Quality and so on.

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->
# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

<!-- List all products the extension interacts with -->
- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)




**Configuration Parameters:**

* Storage bucket name: Your storage folder path

* Cloud Function memory: Memory of the function responsible of edit images.  Choose how much memory to give to the function that edit images. (For animated GIF => GIF we recommend using a minimum of 2GB).



**Cloud Functions:**

* **modifyImg:** Response an image located in your Bucket using image customization.
