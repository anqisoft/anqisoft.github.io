@ECHO OFF
chcp 65001
:: %1: server, local, %2: min, %3: fileName, %4: subFolderName %5: parentFolderName

set langSet=en zh_cn zh_tw
::set landscapeSet=false true
set useDiceSet=true false

set htmFilename=%3%

:: echo %5%
:: https://www.robvanderwoude.com/battech_defined.php
:: IF "%5%"=="" (ECHO %%5%% is NOT defined) ELSE (ECHO %%5%% IS defined)
:: pause & exit

set parentFolderName=mini_poker
if "%5%" neq "" (
  REM echo %%5%% is defined.
  set parentFolderName=%5%
)

:: echo %4%
set subFolderName=
if "%4%" neq "" (
  REM echo %%4%% is defined.
  set subFolderName=%4%
)
set subFolderName=%subFolderName:\=\\%
:: echo subFolderName: %subFolderName%
:: pause & exit

if "%2%" == "min" (
  set minSeg=.min
) else (
  set minSeg=
)

set htmlPath=%cd%
call set htmlPath=%%htmlPath:_bat\%parentFolderName%\%htmFilename%=%%
:: echo %htmlPath%

if "%1%" == "server" (
  set url=https://anqisoft.github.io/
  set goal=%CD%\server%minSeg%.json
) else (
  set url=file:///%htmlPath:\=/%
  set goal=%CD%\local%minSeg%.json
)
set url=%url%%parentFolderName%/%htmFilename%%minSeg%.htm

:: https://www.codenong.com/37071353/
if "%subFolderName%" neq "" (
  set pdfPath=%htmlPath:\=\\%%parentFolderName%\\%htmFilename%\\%subFolderName%\\pdfs\\
) else (
  set pdfPath=%htmlPath:\=\\%%parentFolderName%\\%htmFilename%\\pdfs\\
)
set pdfPath=%pdfPath:\\\\=\\%
:: echo %pdfPath% && pause
:: echo %url%

echo [>%goal%

title "Create json config file for local"

setlocal enabledelayedexpansion
for %%l in (!langSet!) do (
  set lang=%%l
  rem echo !lang!

  for /L %%n in (1, 1, 7) do (
    set no=%%n
    rem echo !no!


    for %%u in (!useDiceSet!) do (
      set useDice=%%u
      rem echo !useDice!

      set pdfPrefix=
      if "!useDice!" == "true" (
      	set pdfPrefix=1
      )

      set endChar=,
      if "!lang!:!no!:!useDice!" == "zh_tw:7:false" (
        set endChar=
      )

      echo   { "url": "!url!?lang=!lang!&no=!no!&useDice=!useDice!", "pdf": "!pdfPath!!lang!\\!pdfPrefix!!pdfFile!!no!.pdf", "params": { } }!endChar!>>%goal%
    )
  )
)

echo ]>>%goal%
:: PAUSE & exit