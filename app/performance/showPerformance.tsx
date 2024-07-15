import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { getStudentsByGroupId } from "@/sqlite/students";
import {
  addPerformance,
  createPerformanceTables,
  getPerformanceByGroupId,
  updatePerformance,
} from "@/sqlite/performance";
import showToast from "@/components/showToast";
import CustomModal from "@/components/modals/CustomModal";

const ShowPerformance = () => {
  const { group_id } = useLocalSearchParams();
  const [listedStudents, setListedStudents] = useState<
    { id: number; name: string; score: number; student_id: number }[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [performance, setPerformance] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [groupStudents, setGroupStudents] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchPerformance = useCallback(async (groupId: number) => {
    const result = await getPerformanceByGroupId(groupId);
    setPerformance(result);
  }, []);

  const getDates = useCallback(() => {
    const uniqueDates = [...new Set(performance.map((record) => record.date))];
    setDates(uniqueDates);
    if (uniqueDates.length > 0) {
      const todaysDate = new Date().toISOString().split("T")[0];
      setSelectedDate(
        uniqueDates.includes(todaysDate) ? todaysDate : uniqueDates[0]
      );
      setListedStudents(
        performance
          .filter((record) => record.date === selectedDate)
          .map((record) => ({
            id: record.id,
            name: record.name,
            score: record.score,
            student_id: record.student_id,
          }))
      );
    }
  }, [performance]);

  const fetchStudents = useCallback(async (groupId: number) => {
    const students = await getStudentsByGroupId(groupId);
    setGroupStudents(students);
  }, []);

  useFocusEffect(
    useCallback(() => {
      createPerformanceTables();
      fetchPerformance(Number(group_id));
      fetchStudents(Number(group_id));
    }, [group_id, fetchPerformance, fetchStudents])
  );

  useEffect(() => {
    getDates();
  }, [performance, getDates]);

  const handleScoreChange = (id: number, score: string) => {
    const updatedStudents = listedStudents.map((student) =>
      student.id === id
        ? { ...student, score: parseInt(score, 10) || 0 }
        : student
    );
    setListedStudents(updatedStudents);
  };

  const handleChangeDate = (date: string) => {
    setSelectedDate(date);
    setListedStudents(
      performance
        .filter(
          (record) =>
            record.group_id === Number(group_id) && record.date === date
        )
        .map((record) => ({
          id: record.id,
          name: record.name,
          score: record.score,
          student_id: record.student_id,
        }))
    );
  };

  const handleSave = () => {
    listedStudents.forEach((student) => {
      updatePerformance(student.id, student.score);
    });
    showToast("Saved Successfully");
    router.back();
  };

  const handleCreate = async () => {
    new Date().toISOString().split("T")[0];
    setIsModalVisible(true);
  };

  const handleConfirmCreate = async () => {
    setIsModalVisible(false);
    const todaysDate = new Date().toISOString().split("T")[0];
    groupStudents.forEach((student) => {
      const existingPerformance = performance.find(
        (record) =>
          record.group_id === Number(group_id) &&
          record.date === todaysDate &&
          record.student_id === student.id
      );
      if (!existingPerformance) {
        addPerformance(todaysDate, Number(group_id), student.id, 0);
      }
    });
    fetchPerformance(Number(group_id));
    showToast("Created Successfully");
    router.back();
  };

  const handleCancelCreate = () => {
    setIsModalVisible(false);
  };

  const renderStudent = ({ item }: { item: any }) => {
    const student = groupStudents.find(
      (student) => student.id === item.student_id
    );

    return (
      <View style={styles.studentContainer}>
        <Text style={styles.studentName}>{student?.name}</Text>
        <TextInput
          style={styles.scoreInput}
          value={item.score.toString()}
          keyboardType="numeric"
          maxLength={3}
          onChangeText={(text) => {
            const score = parseInt(text, 10);
            if (!isNaN(score) && score >= 0 && score <= 100) {
              handleScoreChange(item.id, text);
            }
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Performance Date</Text>
      <Picker
        selectedValue={selectedDate}
        onValueChange={(itemValue) => handleChangeDate(itemValue)}
        style={styles.picker}
      >
        {dates.map((date) => (
          <Picker.Item key={date} label={date} value={date} />
        ))}
      </Picker>

      <FlatList
        data={listedStudents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStudent}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
        <Text style={styles.saveButtonText}>
          Create Today's Performance Sheet
        </Text>
      </TouchableOpacity>

      <CustomModal
        isVisible={isModalVisible}
        message={`Are you sure you want to create performance records for ${groupStudents.length} students?`}
        onConfirm={handleConfirmCreate}
        onCancel={handleCancelCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 120,
  },
  studentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  studentName: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  scoreInput: {
    width: 50,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ShowPerformance;
