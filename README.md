This is U-target Website project, after the build, the files in __dist__ will be copied to __utargetenergy.github.io__ project.

__utarget.github.io__ contains some markdown files and images which are not in this project.

## github checkin

- start ssh agent
- add key using ssh-add
- use grunt to push the code to github

```
$ eval $(ssh-agent -s)
$ ssh-add ~/.ssh/id_rsa2
$ grunt buildcontrol:pages
```

## bower install

install packages under __node_modules__.

```
$ bower install
```

To make life easier, I manually delete the files under __node_modules__.
