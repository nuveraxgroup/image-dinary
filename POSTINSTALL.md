<!-- 
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/publishers/user-documentation#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-postinstall
-->

# See it in action

You can test out this extension right away!

Visit the following URL:
${function:modifyImg.url}

# Using the extension

When triggered by an HTTP request, this extension responds any image stored from: "${param:BUCKET_NAME} bucket".

Query Parameter Options:

| Param | Description                                                                                                                                                                                                                         |
|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| file  | Required image path in your "${param:BUCKET_NAME}" bucket. Example `file=image.jpg` or `file=path/subpath/image.png`                                                                                                                |
| b     | Apply blur to the image, it should be a value between `0.3` and `1000` representing the sigma of the Gaussian mask, where sigma = 1 + radius / 2. Example `b=10`                                                                    |
| s     | Apply scale to the image, it should be a value between `0.1` and `10` representing the scale size, if you use `1` as scale then the final result should be 1:1. Example `s=2`. When you apply scale `h` and `w` params are ignored. |
| h     | Height for the image result, it should be a value more than `0`. Example `h=100`. This param is ignored when scale is provided.                                                                                                     |
| w     | Width for the image result, it should be a value more than `0`. Example `w=100`. This param is ignored when scale is provided.                                                                                                      |
| fit   | How the image should be resized to fit both provided dimensions, one of `cover`, `contain`, `fill`, `inside` or `outside` (default `fill`). Example `fit=cover`. This param is ignored when scale is provided.                      |
| r     | Angle of rotation, Example `r=90`. You can apply background color for the empty spaces generated with `bg` param.                                                                                                                   |
| bg    | Hexagesimal background color, it's uselful when apply any transformation that generates empty spaces like rotation or resizing. Example `bg=fafafa` or with alpha channel `bg=fafafa01`.                                            |
| shp   | Sharpen the image. The sigma of the Gaussian mask, where sigma = 1 + radius / 2, between `0.000001` and `10000`. Example `shp=5`                                                                                                    |
| gs    | Apply Greyscale filter. Use `1` to activate. Example `gs=1`.                                                                                                                                                                        |
| q     | Quality, integer 1-100 (optional, default 80), the result is an small byte size. Example `q=40`                                                                                                                                     |
| jpgCp | Apply mozjpeg image compression, use `1` to activate. Example `jpgCp=1`. Works only with JPG, JPEG images.                                                                                                                          |
| pngCp | Apply zlib compression level, 0-9 (default 6) 0 apply less compression - 9 apply high compression. Example `pngCp=9`. Works only with PNG images.                                                                                   |

To learn more about HTTP functions, visit the [functions documentation](https://firebase.google.com/docs/functions/http-events).

<!-- We recommend keeping the following section to explain how to monitor extensions with Firebase -->
# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
