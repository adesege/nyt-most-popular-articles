declare -a volumes=("nodemodules" "nodemodules2" "build" "nuxt")

echo "================================= Creating volumes ================================="
for volume in "${volumes[@]}"
  do
    docker volume create --name=$volume
  done

echo "================================= Volumes created successfully ================================="
