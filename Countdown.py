from itertools import count
from tkinter import *
import time
import webbrowser

window = Tk()
window.attributes("-fullscreen", True)
# make bg grey
window.configure(background='grey')
countdown = StringVar()
label = Label( window, textvariable=countdown, font=("Helvetica", 200), bg='grey', fg='white')
#render the label with the countdown
label.pack()
# put the label in the center of the screen
label.place(relx=0.5, rely=0.5, anchor=CENTER)


for x in range (10, -1, -1):
    countdown.set(x)
    window.update()
    time.sleep(1)

webbrowser.open("https://youtu.be/dQw4w9WgXcQ",new=1)


