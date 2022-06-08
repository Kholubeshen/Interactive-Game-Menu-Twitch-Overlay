#NoEnv
#Warn

#InstallKeybdHook
#UseHook On
Menu, Tray, Icon, shell32.dll, 283 ; this changes the tray icon to a little keyboard!
#SingleInstance force ;only one instance of this script may run at a time!
#MaxHotkeysPerInterval 2000
#WinActivateForce ;https://autohotkey.com/docs/commands/_WinActivateForce.htm
SetKeyDelay -1, 50
#IfWinActive ;---- This will allow for everything below this line to work in ANY application.

; CHANGE THIS TO ADJUST HOW LONG TO PLAY THE SOUND EFFECT FOR (In Miliseconds)
Sleeptime = 5000

; YOU CAN SET YOUR PREFERRED MACRO HERE
; SINGLE DIGIT CHARS REQUIRE NO CURLY BRACES
; IF YOU NEED TO SET DOWN OR UP YOU NEED CURLY BRACES
; AUTOHOTKEY KEY LIST https://www.autohotkey.com/docs/KeyList.htm
Laugh1Hotkey = {LControl down}{LShift down}1{LShift up}{LControl up}
Laugh2Hotkey = {LControl down}{LShift down}2{LShift up}{LControl up}
Laugh3Hotkey = {LControl down}{LShift down}3{LShift up}{LControl up}
EndLaughHotkey = {LControl down}{LShift down}4{LShift up}{LControl up}

~f20::
KeyWait, f20
FileRead, code, Hotkeys.txt


If (code = "laugh") {
	ControlSend, Qt5QWindowIcon26, %Laugh1Hotkey%, ahk_class Qt5QWindowIcon
;	sleep, Sleeptime
;	ControlSend, Qt5QWindowIcon26, %EndLaughHotkey%, ahk_class Qt5QWindowIcon
	return
}

If (code = 2) {
	ControlSend, Qt5QWindowIcon26, %Laugh2Hotkey%, ahk_class Qt5QWindowIcon
	sleep, Sleeptime
	ControlSend, Qt5QWindowIcon26, %EndLaughHotkey%, ahk_class Qt5QWindowIcon
	return
}

If (code = 3){
	ControlSend, Qt5QWindowIcon26, %Laugh3Hotkey%, ahk_class Qt5QWindowIcon
	sleep, Sleeptime
	ControlSend, Qt5QWindowIcon26, %EndLaughHotkey%, ahk_class Qt5QWindowIcon
	return
}
If (code = "msg"){
	MsgBox, , Chat Alert!, Pay attention to chat!,
}
If (code = "confetti"){
	ControlSend, Qt5QWindowIcon26, {LControl down}{LShift down}5{LShift up}{LControl up}, ahk_class Qt5QWindowIcon
	return
}
If (code = "bday"){
	ControlSend, Qt5QWindowIcon26, {LControl down}{LShift down}6{LShift up}{LControl up}, ahk_class Qt5QWindowIcon
	return
}
If (code = "snow"){
	ControlSend, Qt5QWindowIcon25, {LControl down}{LShift down}7{LShift up}{LControl up}, ahk_class Qt5QWindowIcon
	return
}
If (code = "laser"){
	ControlSend, Qt5QWindowIcon26, {LControl down}{LShift down}8{LShift up}{LControl up}, ahk_class Qt5QWindowIcon
;	sleep, 12000
;	ControlSend, Qt5QWindowIcon26, %EndLaughHotkey%, ahk_class Qt5QWindowIcon
	return
}
If (code = "disco"){
	ControlSend, Qt5QWindowIcon26, {LControl down}{LShift down}9{LShift up}{LControl up}, ahk_class Qt5QWindowIcon
;	sleep, 12000
;	ControlSend, Qt5QWindowIcon26, %EndLaughHotkey%, ahk_class Qt5QWindowIcon
	return
}