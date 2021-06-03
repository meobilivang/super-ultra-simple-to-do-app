echo 'DEPLOYING TO-DO APPLICATION TO REMOTE HOST'

#Run Ansible Playbooks
ansible-playbook -i $(WORKSPACE)/ansible/hosts $(WORKSPACE)/ansible/site.yml

#Remove files
#rm -f  $(WORKSPACE)/* 
