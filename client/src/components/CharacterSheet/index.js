import { Container, Row, FormControl, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import io from "socket.io-client";

import Stats from "./Stats";
import Skills from "./Skills";
import Inventory from "./Inventory";
import Titles from "./Titles";
import Spells from "./Spells";
import Proficiencies from "./Proficiencies";
import { useParams } from "react-router-dom";

const axios = require("axios");

const placeholder = {
  id: "1",
  profileId: "sdfgdsa",
  dmId: "jdhkfdsjdkl",
  sessionId: "ajsdfghzdsl",
  inspiration: 3,
  img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBcWFRUXFxcYGh0cGBkaHBccHBodHRceHxkeGh0cICwjGh0pIBwgJTgkKS0vMzMzGiM4PjgwPSwyMy8BCwsLDw4PHhISHjIpIioyMjIyNDQyMjIyMjQyOjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIAP0AxwMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQECAwj/xABGEAACAQIEAwYCBwUFBwQDAAABAgADEQQSITEFQVEGBxMiYXEygRQjQlKRobFicoKSskNzwdHwNFNjotLh8RYzk8IkNYP/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAjEQACAgMAAgICAwAAAAAAAAAAAQIRAyExEkEiURMyBEJh/9oADAMBAAIRAxEAPwC5oiIAiIgCIiAIiIAnTML2vr0neR7thwyrXoXwzZMTSYVKDXt5l3U/sspKkHTUXgEgiQ3sb25pY0CnUtRxI0em1xmYfFkvz0N0Oosd7XkyglqjolQG9iDY2NuR6H1neRHtpUq4ULjqFz4RAxNLlVpE2JPR0vcNyBN7jSSLhnEKeIpLVpMGRxcH9QehB0IgV7M2IiCBERAEREAREQBERAEREAREQBERAEREAREQBETyqkhTlAJsbAmwvbS5sbD1sYBVveh2PsWx+HFiPNiEU2+HaqpGzC3mt+9uDfB7L95NammTEjx0A0qEhX05Mdn99+s0XantI2KxDuFVEt4ZCVGZHyk+fMygG/I5RpbeazDUVz2BAUgX1vY3A0NgDMpTrh1ww2qkWbiu8fD1Eem+FqlXVlYE09VIII1Nr2O00Xdzx36Gz0cRmSg5BWoQCiPt52HwBhbXYEX0GsjLJVo1ENM3R2F81MMrAnmpGuun5TMxHFh4hp06VINYBqihkpmx+2jXtbrv0kecul3hhzZfoN9pzKT4d2kxeDqLapTq0c1mpK4YZf8Ah5vgPQKQL8ps+0Xek1ymEQKAoJqPYsb8qai6gjqSeenOaKSZzTxSiy2Yla9h+3hr1/o9a96ljTJPwnL5kJPxAkXB381ulrKljNqnRzERBAiIgCIiAIiIAiIgCIiAIiIAiIgHEr/vI+l08PUqfS6NOhsKfhuruTshcOSxPoFFr3FgZYEjPbum5wdU0xSDKrXqVP7NMp8QpoTmIGUAcyOkh8LRdNFFYCoqk5hdRra36DZRf8dOU2bnDC7O1VTpdQ1tzqVJB130I6TR4CmzmwNtRe4vtJVgOGrTZLMniMbK1QFj7gEDJ7zmktnpRklGzCocWqU7harNSsTZ11AuLggix+W9thNvgcFTqIfDxHh5tWyqEFjqQSPlpr+U34CMlsRVFRbHy6JTuOpsbnbaRjiHCsKDnDmkGHlpoxNz1OnkX8zfbSVpD8j5Rj8X4NQpEZsUWZjm8qkCwvoSfw053+WswXDndS601NMG2ao4F9eQNi0yaWFpO60cPTq16rcsw8xANzbXKup1a1r8pKx2Ax7gFlwihV0QvUPyOWnv63M1jFmM8taNN2S4U1biFEMafkIqHIfhFNgemt7S+JVPYzgeLp49DUw3gJTV8zADKwK2AzKSGJax3vYS1ptHhyTduzmIiSUEREAREQBERAEREAREQBERAEREA4mDxHh6V1CVLlAwZk5Pl1VW6rmsbc8oB0uDnSuu8ftkKSvhKDfXMv1jD+zVh8I/bYfgDfpIbpFoxcnSK3xWKvWq1UA8N61R0y2AyFyRoOo/SdE4+EJOS7Xutwxt7Da8y6PCj9HW4W/iKg/dPX5/pO+K4WGprpZ1FvfQazn03s9CTpJI0eJ4xVqHQsDvroB7KJKu7jssuOqVHxDMaVIremCR4jtc2ZhrlAFyAdbjlvEKrZGIXcS5O6vH4cYVKSeWqxZ6l/tvoCQfRQot0Am8Yr0jjnkddJfw7g2Gw9zQw9KkSLE00RSR0JUXPzmxiJYxEREAREQBERAEREAREQBERAEREAREQDieGKxKU0apUYKiglmJsABuTPeQLvZxBXD0FvZXrrn6MFR2VT6ZgD/DIbpWWhHykkRXtD3gYuqX+jN4VK9lsB4lgd2LA5Seg2vaRjhlMtULOS2bzO2pY3JzMSdSbnT1iiC5+AE384H2r3vb1Ey0QqVWnVHmNvMCCvuZzuTfT0Y44x4ZeN4gPDyqNqqsP3R8I/A2+Uw+M4osEyEhrW+XrNcKVTOaQUlwdQNfXT0/znf6FVZtVtb7xC297mSiko60YVRAPKLX3Y+vITyp16lM2p1GXzBgVJBBHMHkbaTYvw629QE9EBc/jtGG4Uza2ydM2pvyuOUv50UWO9NGzHbLiOgGLdbW3WkRf1JT9ZYXZrt8Hy0sUAlXUFl0UkC+ax1AOu19dOl68o4Vqao5WmaucAAgMGttZToTttrpMnjmBU00xDeKjuTmUrbI4OlmNiFO66baX0kRyU97LTwRlHWmXrTqBgGUggi4I1BE7yruxHbBRVTD1NFqWFM8gxG3oCRtttLRm2vRwtNOmcxEQQIiIAiIgCIiAIiIAiIgCIiAcSFd6mBapggyi/hVFqN+7lZCflnB9gZNZ51qSurKwDKwIYHYgixB+UhkxdOz567P1SrX0OvPYiTTHUadRFPhBv3dx+G/4yMYalTp1KtIgjwqtRFG5slRlG++gm5TiFLLlVTm6rdbTkb2z1GrimjrwOhTqO7Npfy7NcgftXA5Tf4bhGEuS1EEdR5j8zIrw1wp1crcm3Nb5tQQZICqWJOUX+1TYi/8J2izNo9MeMOgPhIEtzsLyHcVq3JsRr8jNpj8UiA5aij3BY/5SJ47iDOSLgg9QP0kxTbsm0lRncO4yaTAOL22J1/8TY1OLI6uPEZkYf8AtscwF+YvsPSRA0SXVF+JuXIdLzJ+itTqeHUXK+nsb7WPMHrLyxf2EcyvxMqs7FFdbDIbXG4I1Uz6B4BjvHw1Ct/vKaOfdlBP53lJYHhOenUUMAdCAeZF/wBZMO7vtUtNVwdfyZTlpsdALn4D09JbG1ww/kRb3RZ0THxIcr9WVDDbMCVPobaj3G3rtMDAcaV6hpOPCrjemxF2H3qbbVE9Rr1AIImxy0biJxOYIEREAREQBETyq1VRSzEBVBLE6AAC5J9LQD0moxHaLCJUFJq6CpmC5b3sxIAViNFJuNCRvKu7Sdv6tSq/g1KiUPhpqnlZxbVyQM6km9hcWFtjeRrD0q+apXphMrE5lqPmYlvizZvivvqZm5/RvHA/Z9GxKd7P96T06S06tFqzID9ZnAYgHZrr5iB9rcixOt57cQ708QwIpYZKfRnc1CL88qhR7an2MvZk4tOi2KlQKCWIAAuSTYAcySdhK/7S9vWAZMEocjeswuo/u1+3+8dPRpX79oMTiXUYmoa1zZVLZKdx1RLITzBImRiatQDKXpqvRB/2F5nObWkdGLCmrZoRjqlSrUeo4ao7EsxAW5O58oAH4Ta4JHZwHcAc9SSfbSaXEIi1TqcrfC3QzIoYtla17gb8xaZy2dMfiiWcSwBJNShZ1bV6YIJDcyt9wem9/wAtFX4k66MjKOYKkTIw2IpAXSoytOW4iX8rkE8m/wA+olCVbRpK2Lv8Kj31JmI4ZdT8R26/9puMWtXXyi3VbW/KYDZALfE/OaKX0V8L6eGCr2a4Bve7NztztLFxfZk4vhwxFMEVaYuqjUsi/EvqwGoA5gjmZB+CYJqtVaQ0LsAetr/kJ9GYDCJRppSQWVFCj5f4nedKfwr7OHJ8cia9FCcO4jdQSbOv5iccQZWdX3DDK3vfQyS943Y9qDNi8Ov1bG9VB/Zk7sLfYJ/lJ6fDAWxOYW/KcrhTO6OSM4lvd3faZqhOErteogvSc/2iDdSfvLofUexks49wOliky1AQym6VFOV6bfeRuR9NjzlD4HGvTeliF/8AcpuDvvl6+hFwfQy++DcXpYqmKlJriwzLzUkXsw5GbQdrZx5Y+MrRFML2ixOBqjD8QBqIzWpYtQApXQfWjkQdzyvzHmk5RwQCCCCLgjUEHYg85h8Z4VSxVJqNVbow9iDyKnkw6ys+Gcar8GxH0TFsXwliaThbkKW0Zba2FyGXWxtbTe3CleXOluxPKlVV1DKQysAQRsQdiJ6ySgiIgHE0fbKk74DFKilmai4Cjc+U3A6m3KbycMdIJTpnywlS7A8gNJscHUVj9bmZBsMxHve0kWF7DVcVQ8fClM4d1dHYrmACspQgEX1IsbDbWRjD4KtV+qpUajuDlZFRiVN7EPyTXrbnMWjtjNOzjHmjnU0Lg3sQbnSeLOwW99tLex/8fhN7w7ssWektR/DJxLYZyFDFKiBL87OGzkemW+t7SycF3XYNDd3rVOoLKq/8ihh+MtHhhkauykhVIty1BHuNJvMBwTG1j9XRqvf7WR7fztZfxMvfhnZzCYfWjh6aNr5soL67+c3a3zm3lnGyqyuKpFNcN7rMRV/2iolJeg+sf8BZV97n2kW7ScEbA4p6Vy6gBkZtCyNsdNLg3U25rtrPoqlUVgGUgg7EG4mi7WdlaOPpBal0db+HVX4kJ3/eU81O/obEQ46EcrTtnz89cB9F06GeteuWAsMpHsI4ngDh61Si5BemxVrHQkbFb8iCDaYDP7iUcTqUtG1w7sVINTL1Fr/4zGepk0Tbm1tT/lMak4B1JM74hyfbkOQ/zlfHZdzVaN/2Iu+Moog+Kolz+yGBb8hPoefNHZnjH0Sp4yqGZFOUNsWtpe2tp9FcIxvjUKVXKU8Smr5TuuZQbfnOhNVRw5E/KzLdQRYjQ7z5r7TGn9NrjD0xTppVZFUE28pysV6KWBIA0AsBPo7G4paVJ6jmyU1Z2PRVBJ/IT5moM1So1RmILszEm4uWJY3I21MrInGZCramTdfwH5k/obSa9z2Ib6XVRja9Jmtc62qJy9Ln+aQnH1r2XS+19NR0JG/+telndznBmSlUxTrbxQFp33yKTmPszWH/APMHnIRMtJlmSPdsOzqY7Dmm1hUXzUn+6w/+rbH0PUCSGJcyTp2VR3edrmp1PoOKBWzFKbMdUcNY0m+ex9PaWvKg71eEGlXTEU1sK/lcgaiooGUjoWUfih6yc9hONnFYRS5+tp+Sr1LACzfxCx97yqfpmk4qvJeyTxESxkJ44lrIx6Kf0ntMTib2o1T0pufwUwCKd1Jvgj/et/QkmgEhfdQ18Df/AIh/oSTWRHhMukfxHZPCviVxRQiorBtCQpcbOy7Fhpr6C97SQREkN2cxEQQQ7tJgMVh2OLwJv9qvhjqtXq6D7NTrlsW99+3A+3eGxCi+ZH+0tibewGp+QMl0qXvG+hGoXosTilbK4pjyghvMXYbONRpc9RzlZOtlo70yBdo0b6VXc3YPVqEMQdbuSNxcaWmuQ6ai8klDjdS6tVU1QotcaNb9rr76zYvwHB4wB8LV8OofipuAoJ9xoDf0tM2dMZEJbTlb3nVyTubdZuuIdn2oH63xE1IvlBBI6OCR/jMDMgPkUk9Tqf8AISvkWezvg8Mlx4miX+Hm3Ut0UfnLr7v+NNXSqrWCq/1Q55BofcAykamYb7nl09SeZm94Rj8VgmWpTZRmW+U2YEH0B3sOstCdaZnPG57RYfe7xhaeD+jhvPXYAgHUIpzMfYkBfXMehlPo4Vbi17a+v/f/AFzntxXFVK9Vq1Zi9RjqTpYDYAbBR0H6zAe7MFUXYkAAbkk2A9Te1pe7K+Hjpm77N8AfHV1oqcv26j8lp3AYj9o3sPX0F59E4eiqKqKAqqAqgbAAWAHykd7CcAGDwiKy2quM1U6E3Oy36KLC2179ZJ5ZIznK3o5iIklCPdtuGHEYKsi/GFLoRvmTzC3vbL/FKu7seLPRxio+bw8QAhv9/UodfW6/xy8DPmDC4xqVRSjEhHzJ6ZWupHTYSktOzfF8otM+oYnlh6odVYbMoI9iLxLmB6TX8f8A9lxH9zU/oabCYPGv9nrX28J/6DIZKIZ3NVb4Kov3K7D8adM/4ywZV/crX8mKpfddH/mDKf6BLQkR4TP9jmIiWKidHawvr8gSfwE7zA4vxKnhqL1qrZUpi56noAOZJsAOpgFZdv8AvAxNKucNhkai1MA1HcU2c5luoUAsFXKQb/FttzgWFxhUjxb5W+1qdb6kncnX85618QcRXqVG+Oqxc31I+6pP4bWG1gBpNljqIyIr+YqCCdPtDUD5TnnJN0d2PFUTW4twGuhv+oPr1HrvPOhirG5Fj94aH/vPBCBpfYa+1yAfXae1BA2lwDyudPa/6Sn6lHRum41X8Pw3bxKR+ybG/rbe/qJpsTiqVvKrId8u4vPXw8m9vYa/nPLFuuW1gSNPnzl1K+la+jpwnCnEVlUnfU/uibXHH/8AJCUVAy2NuXl99Bf2G200VGvUpDMNLjcfpPXhmJOZqh+K4N7kfn/raJL2bwaVL2Z+KqBqhNYZWJJfLYkXXTTawNtJKu6PAUnxdZ3UO6Ihpkj4bsQxt97RbHlr1kNw+M+squfNcaXsf10M3HYztecD4lqFOp4jAuc7I9hooDWKlRcm1tydZaHSmZ/Ev+JE+zXbjDY2oKaLVRypYB1ABy2zBWViCRcdNJLJscQiIgGo7T8SGGwdesd0Rsvqx0QfNiB8589IlM0wyrlYEg66baWk571e0y1nGEpNdKbZqrDZnHwoDzC7n1t92QLDqWOVdS1lA6knSZy2zrxLxjv2fRnZok4PDE7mhSv/APGsTMwNDJSRPuoq/wAqgf4RNDlZ7zTdrmtgcUf+DU/oM3M0fbX/AGDE/wB036SJcEeoiHczSGTFvzNVV+SqSP6zLLladzdXyYqn916bX/fQ/wDT+csuRHhM/wBjmIiWKnEqHvb41nr08Ip8tJfEcci7A5Af3V1/jEt0mfNXGsf41SrVJu1Wqz3/AGL+QewWw+UpN6o2wxuV/Q4Y9iSdTe5M9cfizMBHss5oU7+Z/hHLrMq3Z2eTqjoEIFyPiU/qTPGjVyt1GxvNhhcPUxeISjSy52PlDMEFgLkXPoNhc+kxcZw+rQqGnWpmm9ibGx2Yg6gkEXUjTpLVo55pN0jLdlGqm55enWYOe5AnNG9/QCdKgYHPlOTMUz2OXMBcrm2zWINuhlYKiX6NjSqKVyMLhjY/hYWnm/DG1AI009fTaY1DEZQDzzW+UzcJWN7ZrEncbyzNErMc4TLcG6nnqDfraZ1OmmVanho2Q2ZWF1bXTNYg7Ec+U7cT0G9z1NtfedOFMCHU7Mv4GFLVkShTokPZPtBgsHVaqcLVDkFQUqZ1UEgsEV7Fb2G7MbDeTxO8rAWBd6lO/wB6m5/ozCU3UpkGxGv6zKxeFXwVP2lAJH5H/P5SfNor+GMi16nedgNkarUPILTYX+b5RIT2r7yMTWzUqKnDU9i171WBH3hpTFulz6yE4ZwtRSPvD8L6/lMji7eJUzLsQAR7afpHm7olYoJX7OmEqIUNNlvbVTsR1EmHdvwI4jFLUK/VUCHPQuNaY97+b5es1fZPsnWxb2QZaYPnqEeVRzA+83oPnaXlwbhVPC0lpUlso3PNjzZjzJkxiZ5MmqNjERNDmOJpe2BAwOKv/uan9Jm6mg7c/wD6/Ff3TfpIfCV0h/dBo+KU7lMOw9ij2/USz5UvdnicuNNPk+FW/umS35FpbUiPC0+nMREsUMTiLWo1D0Rj/wApnzCqN4asR5bAflPqYi+h2lY8Y7r3Ln6LWRaZ/s6gY5PRWXdegIuOplJJvhtinGNplTGprOXqk2Amz7Q8EfCV2o1KlN2UKSUvYZhcDUCxtY/MTVrYDTn+MrR0eV8ObFLGmT4ikMrLfNnBuuW3O9restrvE7G4jEtTr0Tmfyq9I6BS1gzKeQJtcbaFut493WcBXEYpqzi9PDZSo5NUa+T+UDN75Zd8ulaOacqlo+bOyvCnxWISllYKairVNrFAcxN77HKj/MS5OCdkaP0EYavSBHiVXKkhiC7OqnN94IwAYdBMHsxwNqPFse2W1JvDqptZmqZ7kdMpNQW/a9pPZEY0VlNs+ZOK4BsJiHoVBc0qhF/vLurexWx+c89mVtryy+9/s+T4eNRb5AErW5LclHPoCSCfVeQlZu+ayiUkqZ14pXEysdUJGs9+zvCK+Jd1oJnKrci6jS4H2iBvMXG0yBZjYzd92/GjhsWl/gqsKb/xGyn0sxHyvECcrfUZ/wD6M4h/uG/npf8AVOg7E8RbTwCPd6Q/+8vKJp4o5fzSKWwvdhjGPmajTHO7Fj+CrY/jJbwXuyw1IhqzNXYcj5U/lGp+Zt6SeRJUUVeSTPKjSVFCqoVVFgqgAAdABoBPaIklBERAOJGu8Gpl4diT1VR/NUUf4ySyC97GLKYMKPtvr7KjN+oWQ+ExWyF92dW/FFB/3dQD5AS7pSHd9h8nEaNQNcMtQMOjNcAeulj7S75EeEy6cxESxU4mv41xSnhaL1qhsqC/qTyUepOnzmRjMYlJGqVHVEUXZmNgBKI7c9p6mPqeXMmHpn6tDuTt4jjqeQ5D1JkN0XhByZHuK498RVqVn+Ko5J9L7AegGg9BMY6fIXMUhmIGwE9sJS8SotMC5d0pgdczhQPneUOpaVl/9guCjCYKkhFnceJV653AJB/dFl/hkkiJocbduzqEFyeZAB9he36md4iCDyqUwwKsAQQQQRcEHQgg7iUz227B1MKzVsIjPQJuaags9I+gGrJ67jn1l1RIasvCbi7R8uPVL7D5nnPXCLZ6YB1NRPxLC054gbVaq9Krj8HYf4TFY+46Ebg9R0mZ1t2fU85mq7NcS+k4SjW51EBb0YaOPkwI+U2s1OEREQBERAEREA4kT7wOCvisOPDUs6NfKLXZWBVwL8wDf+G3OS2cSGrVEp07Kh7u+CYr6YtSrSqU6dMsSXUoCfDKAKG1Ju19NND6S3omPjWcU3NNQ1QKcisbBmtoCeQvzhaDds8+IcQpUFz1aiou12NrnoOZPoJX3aDvPCOVwqK4Gmdw3mP7KixA9SflIX2ypV0xTJWxBxNUIHqZFYLTB1yrqcoAsSQqgZl5maPh73ewTOW0VVBYk+g1JJlZSZvixxfTb8X4zicWc2JqEgEMKW1MX2yqOm1zczS4hr+Vdv8AX5T0x1CshVKlOpT3yiojobD94DQdZ0w2IVQbbg6Hr1B9JSn03uP6o98LgmJWmgzPUYIF6sxsvy1l1cP7D0KVXCVR8WGpFLWHnc7O3qM1Q+7D7sj3dX2duPptVdSMuHB5LqGf53yr6XOzCWfLxjXTny5LdL0cxES5gIiIBxPHEVgiM7GyqpYnoALme0jXb7G+Hgao51B4ajrn+L/lzSG6RMVbooPFOXqFzu7Fjy1ZiTFVLPa2h2tr/ozmo16nLfr09f8AGc4/RgR/rSZXs76VMtXuh4j9XWwpN/DYOnOyvcMPky3P78sqfPvZnjRwteniQCUAyVVA3RrZgPUEBgBzW3OX5h66uiujBlYBlYbEEXBHpaaQdo5c0PGV/Z7xESxiIiIAiIgCIiAIiIBr8JwylSerURbPXYNUbcsQoVRfkABoNtT1mTSwyKSVRVJ3IUAn3tvPeIBD+OdjUxmNWvXa9FKaoKQJBZg7lsxGy6jbU9QBr4Yfux4ejBilRwDcIzkr7ECxI9CTJtEiifJnVEAAAAAGgA2AneIkkCIiAIiIB5VqgVSxNgAST0AFyZRHaTtY+McuSopJc06eXZSdGLX+Mgew2HU2722xOTh+KYGxNJkU9GcZF/NhKW4N2OxuJVKlOjalV+GozIqhQSASL57achrylJK9G+FqLtmgouM9ybAfj8vWeuPxIZb+a46m8lfeF2POCFOpTBajkRHe21RQQWccg+hvte45i8c7N8FqY3EJRRSVYqarDZKYIDMTy026m0q47NVk1/h2qZsM9WlUF2psVsduoPsQQfYyxO57jTuauFdsyKgqUx9y7kVF9rkEDlr1kq7S9iMJjWD1A9OoAAXpkKzAbBrgg262uOsin/pw8K4lhq1Is2FrOKLX1ZGqDKFY81LZWB6qRzF7KNOzKWTzjRasREuYCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgEc7b8JfFYXwE+3VpZzcCyCqpdtd7AXt6TeYagtNFRFCoihVUbBQLKB6ACe0QTZwRIX2f7MNhuJ4uqi2oVqaspFrB2cl1A9CCdrWcCTWIFnM8MTh1qKVZQVNjY9QQQfkQD8p7xBAiIgCIiAIiIB//9k=",
  name: "Jerry, Slayer of PCs",
  level: 17,
  race: "Kobold",
  class: "Cleric",
  alignment: "Lawful Good",
  background: "Acolyte",
  description:
    "Jerry was born as a pup, he was found by muriel, who lived in the middle of nowhere",
  inventory: "Map, Torch, a single gold coin",
  weapons: [
    {
      name: "Longsword",
      damage: "1d8",
      description: "A long sword",
    },
    {
      name: "Club",
      damage: "1d8",
      description: "A club, made of bubbles... Not very effective",
    },
  ],
  spells: [
    {
      name: "eldritch blast",
      description: "Blast your enemies warlock style",
      level: 0,
    },
    {
      name: "fireball",
      description: "Mr. Worldwide, Pitbull",
      level: 1,
    },
  ],
  spellSlots: {
    current: [2, 1, 0, 0, 0, 0, 0, 0, 0],
    max: [2, 3, 4, 5, 6, 0, 0, 0, 0],
  },
  stats: {
    strength: 20,
    dexterity: 21,
    constitution: 22,
    intelligence: 19,
    wisdom: 8,
    charisma: 17,
  },
  speed: 30,
  armorClass: 20,
  hitPoints: {
    current: 30,
    max: 30,
  },
  condition: "poisoned",
  inpiration: 4,
  proficiencies: {
    skill: ["Animal Handling", "Insight"],
    stat: ["dexterity"],
    armor: ["Heavy", "Light"],
    weapon: ["Martial", "Simple"],
    tool: ["Lockpick"],
    language: ["Commmon", "Infernal", "English"],
  },
};

function CharacterSheet() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [char, setChar] = useState({});
  const [saved, setSaved] = useState(true);
  const { id } = useParams();
  const socketRef = useRef();

  //connect socket.io
  useEffect(() => {
    socketRef.current = io("/");
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const getData = async () => {
    let response = await axios.get(`http://localhost:5000/character/${id}`);
    setChar(response.data);
    console.log(response.data);
    setLoading(false);
  };

  // get char from db
  useEffect(() => {
    console.log("id useEffect fired");
    try {
      //setChar(placeholder);
      getData();
    } catch (e) {
      setError(e);
    }
  }, [id]);

  // Lets DM change player health
  useEffect(() => {
    socketRef.current.on("healthChange", (newCurrentHealth) => {
      const updatedChar = { ...char };
      updatedChar.healthPoints.current = newCurrentHealth;
      setChar(updatedChar);
      setSaved(false);
    });
  }, [char]);

  function printDocument() {
    const input = document.getElementById("divToPrint");
    window.scrollTo(0, 0);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save("characterSheet.pdf");
    });
  }

  const handleCharChange = (stat, val) => {
    const updatedChar = { ...char };
    updatedChar[stat] = val;
    setChar(updatedChar);
    setSaved(false);
  };
  const handleSave = async () => {
    let response = await axios.put(`http://localhost:5000/character/${id}`, char);
    setSaved(true);
  };

  const saveButton = () => {
    if (saved) {
      return (
        <Button className="btn btn-success" size="lg" onClick={handleSave}>
          Save
        </Button>
      );
    }
    return (
      <Button className="btn btn-lg btn-danger " onClick={handleSave}>
        Save
      </Button>
    );
  };

  const handleLongRest = () => {
    const updatedChar = { ...char };
    updatedChar.hitPoints.current = updatedChar.hitPoints.max;
    updatedChar.spellSlots.current = updatedChar.spellSlots.max;

    console.log(updatedChar);
    setChar(updatedChar);
    setSaved(false);
  };

  const longRestButton = () => {
    return (
      <Button className="btn btn-lg btn-primary mx-5" onClick={handleLongRest}>
        Long Rest
      </Button>
    );
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>{error}</h2>;
  }
  return (
    <div id="divToPrint">
      <div className="d-block p-3 ">
        {longRestButton()}
        {saveButton()}
        <Button onClick={printDocument} className="btn btn-lg btn-primary mx-5">
          Print
        </Button>
      </div>
      <Container className="border border-3 border-secondary mx-auto p-3">
        <h4>
          Session ID:
          <FormControl
            type="text"
            value={char.sessionId}
            onChange={(e) => handleCharChange("sessionId", e.target.value)}
            className="w-50 mx-auto"
          />
        </h4>
        <Titles char={[char, setChar]} saved={[saved, setSaved]} />
        <Stats char={[char, setChar]} saved={[saved, setSaved]} socketRef={socketRef} />
        <Proficiencies char={[char, setChar]} saved={[saved, setSaved]} />
        <Inventory char={[char, setChar]} saved={[saved, setSaved]} />
        <Row className="p-2">
          <Skills char={[char, setChar]} saved={[saved, setSaved]} />
          <Spells char={[char, setChar]} saved={[saved, setSaved]} />
        </Row>
      </Container>
    </div>
  );
}

export default CharacterSheet;
