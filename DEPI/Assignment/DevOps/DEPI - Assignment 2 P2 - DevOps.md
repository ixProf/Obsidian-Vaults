
```bash
sudo useradd -m -s /bin/bash ansible
```

```bash
sudo passwd ansible
```

```bash
sudo usermod -aG wheel ansible
```

```bash
sudo dnf install python3-pip -y
```

```bash
pip3 install --user ansible
```

```bash
echo 'export PATH=$HOME/.local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

```bash
su - ansible
```

```bash
ssh-keygen -t rsa -b 4096
```

```bash
ls ~/.ssh
```

```bash
ssh-copy-id ansible@<Worker-01-IP>
```

```bash
ssh-copy-id ansible@<Worker-02-IP>
```

```bash
ssh ansible@<Worker-01-IP>
```

```bash
ssh ansible@<Worker-02-IP>
```

```bash
mkdir ~/ansible
cd ~/ansible
```

```bash
nano inventory
```

```
worker-01 ansible_host=<Worker-01-IP>
worker-02 ansible_host=<Worker-02-IP>
```

```bash
ansible all -i inventory -m ping
```

```text
worker-01 | SUCCESS => {
    "ping": "pong"
}

worker-02 | SUCCESS => {
    "ping": "pong"
}
```