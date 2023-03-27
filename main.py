import subprocess

class Plugin:
    async def get_ip_address(self):
        info = subprocess.run(["ip", "-j", "address"], timeout=10, text=True, capture_output=True).stdout
        return info

