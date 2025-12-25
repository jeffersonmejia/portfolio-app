#!/bin/bash

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

clear
echo -e "Select commit type:"
echo -e "${GREEN}1) feat${NC}"
echo -e "${YELLOW}2) fix${NC}"
echo -e "${RED}3) refactor${NC}"
echo -e "${BLUE}4) docs${NC}"

read -p "Enter choice [1-4]: " choice

case $choice in
  1) type="feat" ;;
  2) type="fix" ;;
  3) type="refactor" ;;
  4) type="docs" ;;
  *) echo -e "${RED}Invalid choice${NC}"; exit 1 ;;
esac

read -p "Enter commit message: " msg

echo -e "${GREEN}Adding changes...${NC}"
git add .

echo -e "${GREEN}Committing...${NC}"
git commit -m "$type: $msg"

echo -e "${YELLOW}Pulling and pushing to origin main...${NC}"
git pull origin main && git push origin main

echo -e "${GREEN}Done!${NC}"
