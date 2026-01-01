import os
import subprocess
import platform

def run(cmd):
    subprocess.run(cmd, shell=True, check=True)

def clear_screen():
    os.system("cls" if platform.system() == "Windows" else "clear")

def git_has_commits():
    try:
        subprocess.run(
            ["git", "rev-parse", "--verify", "HEAD"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )
        return True
    except subprocess.CalledProcessError:
        return False

def main():
    clear_screen()

    if not os.path.isdir(".git"):
        remote = input("Git remote URL: ").strip()
        if not remote:
            print("[-] Remote required")
            return

        run("git init")
        run(f"git remote add origin {remote}")
        run("git add .")
        run('git commit -m "init: initial repository setup"')
        run("git branch -M main")
        run("git push -u origin main")
        print("[+] Repository initialized and initial commit done")
        return

    if not git_has_commits():
        run("git add .")
        run('git commit -m "init: initial project content"')
        run("git push origin main")
        print("[+] Initial commit created")
        return

    clear_screen()
    print("\nSelect commit type:")
    print("\033[94m1) feat\033[0m: add new feature, report content")
    print("\033[91m2) fix\033[0m: fix errors, issues")
    print("\033[92m3) docs\033[0m: update documentation, refine sections")
    print("\033[95m4) style\033[0m: formatting, code style, whitespace changes")
    print("\033[96m5) refactor\033[0m: code restructuring, optimization")
    print("\033[93m6) test\033[0m: add, update tests")
    print("\033[90m7) chore\033[0m: miscellaneous tasks as build, config, deps")

    choice = input("Option [1-7]: ").strip()

    if choice == "1":
        prefix = "feat"
    elif choice == "2":
        prefix = "fix"
    elif choice == "3":
        prefix = "docs"
    elif choice == "4":
        prefix = "style"
    elif choice == "5":
        prefix = "refactor"
    elif choice == "6":
        prefix = "test"
    elif choice == "7":
        prefix = "chore"
    else:
        print("[-] Invalid option")
        return

    detail = input("Enter description: ").strip()
    if not detail:
        print("[-] Description required")
        return

    message = f"{prefix}: {detail}"

    run("git add .")
    run(f'git commit -m "{message}"')
    run("git push origin main")

    print("[+] Changes committed and pushed")

if __name__ == "__main__":
    main()
