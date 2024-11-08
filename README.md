# React Wordle

This is a clone project of the popular word guessing game we all know and love. Made using React, Typescript, and Tailwind.

# Configuration

## Latest

Note: Sharing feature requires this to be hosted via https as per [#331](https://github.com/cwackerfuss/react-wordle/issues/331#issuecomment-1073155476).

```yaml
version: '2.4'

services:
  wordle:
    image: modem7/wordle:latest
    container_name: Wordle
    ports:
      - 80:8080
```

# Tags

|  Tag   | Description    |
| :----: | -------------- |
| latest | Latest version |

## Project Screenshot

![image](https://user-images.githubusercontent.com/4349962/158677511-50faa60b-26a1-4880-a580-b433389f03aa.png)
