 # Update package information
sudo apt update
# Upgrade installed packages (answer 'yes' automatically to prompts with -y)
sudo apt upgrade -y
# Install OpenJDK 11
sudo apt install openjdk-11-jre-headless -y
# Navigate to the installation directory
cd /opt
# Download Jira Software version 8.20.1
sudo wget https://www.atlassian.com/software/jira/downloads/binary/atlassian-jira-software-8.20.1.tar.gz
# Extract the downloaded Jira archive
sudo tar -xvzf atlassian-jira-software-8.20.1.tar.gz
# Rename the extracted Jira directory to 'jira'
sudo mv atlassian-jira-software-8.20.1-standalone jira

# Set ownership of the 'jira' directory to the 'ubuntu' user
sudo chown -R ubuntu:ubuntu /opt/jira
# Create a systemd service configuration for Jira
cat <<EOF | sudo tee /etc/systemd/system/jira.service
[Unit]
Description=Jira Service
[Service]
Type=forking
User=ubuntu
ExecStart=/opt/jira/bin/start-jira.sh
ExecStop=/opt/jira/bin/stop-jira.sh
ExecReload=/opt/jira/bin/stop-jira.sh && /opt/jira/bin/start-jira.sh
[Install]
WantedBy=multi-user.target
EOF
# Create the Jira home directory
sudo mkdir -p /var/atlassian/application-data/jira
# Set ownership of the Jira home directory to the 'ubuntu' user
sudo chown -R ubuntu:ubuntu /var/atlassian/application-data/jira
# Set permissions for the Jira home directory
sudo chmod -R 700 /var/atlassian/application-data/jira
# Enable the Jira service to start on boot
sudo systemctl enable jira
# Start the Jira service
sudo systemctl start jira




# To disconnect from the tmux session without stopping Jira, press Ctrl-b followed by d (Ctrl-b, d). This will detach your terminal from the session, but Jira will continue to run in the background.
# resolve home irectory issue

cd /opt/jira
sudo nano atlassian-jira/WEB-INF/classes/jira-application.properties
#modify the file to look like this
jira.home = /var/atlassian/application-data/jira
# then press ctrl + x
sudo chown -R ubuntu:ubuntu /var/atlassian/application-data/jira

# having jira run contionuslly 
sudo apt-get install tmux
# New tmux
tmux new -s jira
# start jira
cd /opt/jira
sudo systemctl start jira

#exit tmux
exit