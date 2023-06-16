# API

```jsx
import { Upload } from 'kui-react';
```

## Upload

| 名称            | 类型                                               | 默认值      | 描述                                                                |
| --------------- | -------------------------------------------------- | ----------- | ------------------------------------------------------------------- |
| prefixCls       | `string`                                           | k-upload    | 组件样式名                                                          |
| accept          | `string`                                           | -           | 指定可以上传的文件 MINE 类型,可以使用逗号分隔多个接受值             |
| action          | `string`                                           | -           | 必选参数，上传的地址                                                |
| data            | `object`                                           | -           | 上传时附带的额外参数                                                |
| defaultFileList | `object[]`                                         | -           | 默认已经上传的文件列表                                              |
| dragger         | `boolean`                                          | -           | 是否启用拖拽上传                                                    |
| disabled        | `boolean`                                          | -           | 是否禁用                                                            |
| fileList        | `object[]`                                         | -           | 已经上传的文件列表（受控）                                          |
| headers         | `object`                                           | -           | 设置上传的请求头部                                                  |
| listType        | `string`                                           | -           | 上传列表的内建样式，支持三种基本样式 text, picture 和 picture-card  |
| multiple        | `boolean`                                          | -           | 是否允许多文件上传                                                  |
| name            | `string`                                           | 'file'      | 发到后台的文件参数名                                                |
| showUploadList  | `boolean`                                          | -           | 是否显示文件列表                                                    |
| withCredentials | `boolean`                                          | -           | 上传请求时是否携带 cookie                                           |
| uploadingText   | `string`                                           | '上传中...' | 上传时显示的文件，只在 listType 为 picture-card 时显示              |
| beforeUpload    | `(file:uploadFile,fileList:uploadFile[])=>boolean` | '-'         | 上传文件之前的回调函数，参数为上传的文件，若返回 false 则停止上传。 |
| onChange        | `(file:uploadFile,fileList:uploadFile[])=>void`    | '-'         | 上传文件改变时的状态                                                |
| onRemove        | `(file:uploadFile)=>void`                          | '-'         | 删除文件的回调函数                                                  |

## UploadFile

| 名称             | 类型     | 默认值 | 描述                                         |
| ---------------- | -------- | ------ | -------------------------------------------- |
| id               | `string` | -      | id                                           |
| name             | `string` | -      | name                                         |
| lastModified     | `number` | -      | 最后修改时间                                 |
| lastModifiedDate | `Date`   | -      | 最后修改日期                                 |
| percent          | `number` | -      | 上传进度                                     |
| originFileObj    | `object` | -      | 上传文件的原始对象                           |
| size             | `number` | -      | 上传文件的大小                               |
| status           | `string` | -      | 文件状态，uploading, success, error          |
| type             | `string` | -      | 上传文件的媒体类型(MIME)，由 file 对象表示。 |
| url              | `string` | -      | 跳转地址                                     |
| thumbUrl         | `string` | -      | 缩略图地址                                   |

## Accept type

| MINE Type                                                           | Extension Name |
| ------------------------------------------------------------------- | -------------- |
| `application/envoy`                                                 | `evy`          |
| `application/fractals`                                              | `fif`          |
| `application/futuresplash`                                          | `spl`          |
| `application/hta`                                                   | `hta`          |
| `application/internet-property-stream`                              | `a`            |
| `application/mac-binhex40`                                          | `hqx`          |
| `application/msword`                                                | `doc`          |
| `application/msword`                                                | `dot`          |
| `application/octet-stream`                                          | `*`            |
| `application/octet-stream`                                          | `bin`          |
| `application/octet-stream`                                          | `class`        |
| `application/octet-stream`                                          | `dms`          |
| `application/octet-stream`                                          | `exe`          |
| `application/octet-stream`                                          | `lha`          |
| `application/octet-stream`                                          | `lzh`          |
| `application/oda`                                                   | `oda`          |
| `application/olescript`                                             | `axs`          |
| `application/pdf`                                                   | `pdf`          |
| `application/pics-rules`                                            | `prf`          |
| `application/pkcs10`                                                | `p10`          |
| `application/pkix-crl`                                              | `crl`          |
| `application/postscript`                                            | `ai`           |
| `application/postscript`                                            | `eps`          |
| `application/postscript`                                            | `ps`           |
| `application/rtf`                                                   | `rtf`          |
| `application/set-payment-initiation`                                | `set`          |
| `application/set-registration-initiation`                           | ``             |
| `application/vnd.ms-excel`                                          | `xla`          |
| `application/vnd.ms-excel`                                          | `xlc`          |
| `application/vnd.ms-excel`                                          | `xlm`          |
| `application/vnd.ms-excel`                                          | `xls`          |
| `application/vnd.ms-excel`                                          | `xlt`          |
| `application/vnd.ms-excel`                                          | `xlw`          |
| `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | `xlsx`         |
| `application/vnd.ms-outlook`                                        | `msg`          |
| `application/vnd.ms-pkicertstore`                                   | `sst`          |
| `application/vnd.ms-pkiseccat`                                      | `cat`          |
| `application/vnd.ms-pkistl`                                         | `stl`          |
| `application/vnd.ms-powerpoint`                                     | `pot`          |
| `application/vnd.ms-powerpoint`                                     | `pps`          |
| `application/vnd.ms-powerpoint`                                     | `ppt`          |
| `application/vnd.ms-project`                                        | `mpp`          |
| `application/vnd.ms-works`                                          | `wcm`          |
| `application/vnd.ms-works`                                          | `wdb`          |
| `application/vnd.ms-works`                                          | `wks`          |
| `application/vnd.ms-works`                                          | `wps`          |
| `application/winhlp`                                                | `hlp`          |
| `application/x-bcpio`                                               | `bcpio`        |
| `application/x-cdf`                                                 | `cdf`          |
| `application/x-compress`                                            | `z`            |
| `application/x-compressed`                                          | `tgz`          |
| `application/x-cpio`                                                | `cpio`         |
| `application/x-csh`                                                 | `csh`          |
| `application/x-director`                                            | `dcr`          |
| `application/x-director`                                            | `dir`          |
| `application/x-director`                                            | `dxr`          |
| `application/x-dvi`                                                 | `dvi`          |
| `application/x-gtar`                                                | `gtar`         |
| `application/x-gzip`                                                | `gz`           |
| `application/x-hdf`                                                 | `hdf`          |
| `application/x-internet-signup`                                     | `ins`          |
| `application/x-internet-signup`                                     | `isp`          |
| `application/x-iphone`                                              | `iii`          |
| `application/x-javascript`                                          | `js`           |
| `application/x-latex`                                               | `latex`        |
| `application/x-msaccess`                                            | `mdb`          |
| `application/x-mscardfile`                                          | `crd`          |
| `application/x-msclip`                                              | `clp`          |
| `application/x-msdownload`                                          | `dll`          |
| `application/x-msmediaview`                                         | `m13`          |
| `application/x-msmediaview`                                         | `m14`          |
| `application/x-msmediaview`                                         | `mvb`          |
| `application/x-msmetafile`                                          | `wmf`          |
| `application/x-msmoney`                                             | `mny`          |
| `application/x-mspublisher`                                         | `pub`          |
| `application/x-msschedule`                                          | `scd`          |
| `application/x-msterminal`                                          | `trm`          |
| `application/x-mswrite`                                             | `wri`          |
| `application/x-netcdf`                                              | `cdf`          |
| `application/x-netcdf`                                              | `nc`           |
| `application/x-perfmon`                                             | `pma`          |
| `application/x-perfmon`                                             | `pmc`          |
| `application/x-perfmon`                                             | `pml`          |
| `application/x-perfmon`                                             | `pmr`          |
| `application/x-perfmon`                                             | `pmw`          |
| `application/x-pkcs12`                                              | `p12`          |
| `application/x-pkcs12`                                              | `pfx`          |
| `application/x-pkcs7-certificates`                                  | `p7b`          |
| `application/x-pkcs7-certificates`                                  | `spc`          |
| `application/x-pkcs7-certreqresp`                                   | `p7r`          |
| `application/x-pkcs7-mime`                                          | `p7c`          |
| `application/x-pkcs7-mime`                                          | `p7m`          |
| `application/x-pkcs7-signature`                                     | `p7s`          |
| `application/x-sh`                                                  | `sh`           |
| `application/x-shar`                                                | `shar`         |
| `application/x-shockwave-flash`                                     | `swf`          |
| `application/x-stuffit`                                             | `sit`          |
| `application/x-sv4cpio`                                             | `sv4cpio`      |
| `application/x-sv4crc`                                              | `sv4crc`       |
| `application/x-tar`                                                 | `tar`          |
| `application/x-tcl`                                                 | `tcl`          |
| `application/x-tex`                                                 | `tex`          |
| `application/x-texinfo`                                             | `texi`         |
| `application/x-texinfo`                                             | `texinfo`      |
| `application/x-troff`                                               | `roff`         |
| `application/x-troff`                                               | `t`            |
| `application/x-troff`                                               | `tr`           |
| `application/x-troff-man`                                           | `man`          |
| `application/x-troff-me`                                            | `me`           |
| `application/x-troff-ms`                                            | `ms`           |
| `application/x-ustar`                                               | `ustar`        |
| `application/x-wais-source`                                         | `src`          |
| `application/x-x509-ca-cert`                                        | `cer`          |
| `application/x-x509-ca-cert`                                        | `crt`          |
| `application/x-x509-ca-cert`                                        | `der`          |
| `application/ynd.ms-pkipko`                                         | `pko`          |
| `application/zip`                                                   | `zip`          |
| `audio/basic`                                                       | `au`           |
| `audio/basic`                                                       | `snd`          |
| `audio/mid`                                                         | `mid`          |
| `audio/mid`                                                         | `rmi`          |
| `audio/mpeg`                                                        | `mp3`          |
| `audio/x-aiff`                                                      | `aif`          |
| `audio/x-aiff`                                                      | `aifc`         |
| `audio/x-aiff`                                                      | `aiff`         |
| `audio/x-mpegurl`                                                   | `m3u`          |
| `audio/x-pn-realaudio`                                              | `ra`           |
| `audio/x-pn-realaudio`                                              | `ram`          |
| `audio/x-wav`                                                       | `wav`          |
| `image/bmp`                                                         | `bmp`          |
| `image/cis-cod`                                                     | `cod`          |
| `image/gif`                                                         | `gif`          |
| `image/ief`                                                         | `ief`          |
| `image/jpeg`                                                        | `jpe`          |
| `image/jpeg`                                                        | `jpeg`         |
| `image/jpeg`                                                        | `jpg`          |
| `image/pipeg`                                                       | `jfif`         |
| `image/svg+xml`                                                     | `svg`          |
| `image/tiff`                                                        | `tif`          |
| `image/tiff`                                                        | `tiff`         |
| `image/x-cmu-raster`                                                | `ras`          |
| `image/x-cmx`                                                       | `cmx`          |
| `image/x-icon`                                                      | `ico`          |
| `image/x-portable-anymap`                                           | `pnm`          |
| `image/x-portable-bitmap`                                           | `pbm`          |
| `image/x-portable-graymap`                                          | `pgm`          |
| `image/x-portable-pixmap`                                           | `ppm`          |
| `image/x-rgb`                                                       | `rgb`          |
| `image/x-xbitmap`                                                   | `xbm`          |
| `image/x-xpixmap`                                                   | `xpm`          |
| `image/x-xwindowdump`                                               | `xwd`          |
| `message/rfc822`                                                    | `mht`          |
| `message/rfc822`                                                    | `mhtml`        |
| `message/rfc822`                                                    | `nws`          |
| `text/css`                                                          | `css`          |
| `text/h323`                                                         | `323`          |
| `text/html`                                                         | `htm`          |
| `text/html`                                                         | `html`         |
| `text/html`                                                         | `stm`          |
| `text/iuls`                                                         | `uls`          |
| `text/plain`                                                        | `bas`          |
| `text/plain`                                                        | `c`            |
| `text/plain`                                                        | `h`            |
| `text/plain`                                                        | `txt`          |
| `text/richtext`                                                     | `rtx`          |
| `text/scriptlet`                                                    | `sct`          |
| `text/tab-separated-values`                                         | `tsv`          |
| `text/webviewhtml`                                                  | `htt`          |
| `text/x-component`                                                  | `htc`          |
| `text/x-setext`                                                     | `etx`          |
| `text/x-vcard`                                                      | `vcf`          |
| `video/mpeg`                                                        | `mp2`          |
| `video/mpeg`                                                        | `mpa`          |
| `video/mpeg`                                                        | `mpe`          |
| `video/mpeg`                                                        | `mpeg`         |
| `video/mpeg`                                                        | `mpg`          |
| `video/mpeg`                                                        | `mpv2`         |
| `video/quicktime`                                                   | `mov`          |
| `video/quicktime`                                                   | `qt`           |
| `video/x-la-asf`                                                    | `lsf`          |
| `video/x-la-asf`                                                    | `lsx`          |
| `video/x-ms-asf`                                                    | `asf`          |
| `video/x-ms-asf`                                                    | `asr`          |
| `video/x-ms-asf`                                                    | `asx`          |
| `video/x-msvideo`                                                   | `avi`          |
| `video/x-sgi-movie`                                                 | `movie`        |
| `x-world/x-vrml`                                                    | `flr`          |
| `x-world/x-vrml`                                                    | `vrml`         |
| `x-world/x-vrml`                                                    | `wrl`          |
| `x-world/x-vrml`                                                    | `wrz`          |
| `x-world/x-vrml`                                                    | `xaf`          |
| `x-world/x-vrml`                                                    | `xof`          |
